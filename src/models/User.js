const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String,
    required: true,
    validate : {
      validator: function(role) {
        const allowedRoles  = ['admin', 'user', 'guest', 'reader', 'writer', 'publisher' ];
        return allowedRoles.includes(role)
      },
      message: props => `${props.value} is not a valid role`
    }
  }
}, { timestamps: true });

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash
}

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user
}


module.exports = model('User', userSchema)