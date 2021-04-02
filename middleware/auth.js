const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Get the json web token from the request header
  const token = req.header('x-auth-token');
  // Check for the authentication token and reply with a 401 if there was none
  if (!token)
    return res.status(401)
              .json({msg: "Please log in again or create an account."});
  try {
    // Verify the token and proceed with the next tast if authentic
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({msg: "Invalid token."})
  }
}

module.exports = auth;
