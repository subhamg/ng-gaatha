const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(
      token,
      'My_Very_Educated_Mother_Just_Served_Us_Noodles'
    );
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
  }
}

module.exports = auth;
