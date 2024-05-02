const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpires } = require('../../config');
const { 
  loginSchemaValidator,
  registerSchemaValidator
} = require('../../controllers/users/user.validators');

const User = require('../../models/User');

const TIME_TO_EXPIRE = 24 * 60 * 60 * 1000;

//registro
const register = async (req, res) => {

  const { value, error } = registerSchemaValidator(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  const { username, email, password, role } = value;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }


  const user = new User({
    username,
    email,
    password,
    role
  })

  user.password = await user.encryptPassword(password);

  try {
    await user.save();

    const token = jwt.sign(
      { id: user._id }, 
      jwtSecret, 
      { expiresIn: jwtExpires }
    )

    res.json({ message: 'User saved', token: token });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }

}

//login
const signin = async (req, res) => {

  const { value, error } = loginSchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password } = value;

  const user = await User.findOne( { $or: [{ username }, { email: username }] } );
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const match = await user.matchPassword(password);

  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials', token: null });
  }

  const token = jwt.sign(
    { id: user._id }, jwtSecret, { expiresIn: jwtExpires }
  );
  
  res.json({ message: 'User authenticated', token: token, auth: true });
}

//profile
const profile = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
}

module.exports = {
  register,
  signin,
  profile
}