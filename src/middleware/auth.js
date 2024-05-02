const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function matchToken(req, res, next) {
  const { headers } = req;
  const token = headers['authorization-token'];

  if (!token) {
    return res.status(401).json({ 
      auth: false, message: 'No token provided' 
    });
  }
  const { id } = jwt.verify(token, jwtSecret);
  req.userId = id;
  next();
}

module.exports = matchToken