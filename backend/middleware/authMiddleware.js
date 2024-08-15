const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const { accessTokenSecret, refreshTokenSecret } = require('../config/jwt');

// Middleware to verify user
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    const employee = await Employee.findById(decoded.id);

    if (!employee) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    req.employee = employee;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    res.status(400).json({ error: 'Please login to continue.' });
  }
};

// Middleware to validate role
const roleValidator = (roles) => {
  return (req, res, next) => {
    const userRole = req.employee?.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

module.exports = { 
  authenticateUser, 
  roleValidator 
};
