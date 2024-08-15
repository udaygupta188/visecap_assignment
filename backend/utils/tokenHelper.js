const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const { accessTokenSecret, refreshTokenSecret, accessTokenExpiresIn, refreshTokenExpiresIn } = require('../config/jwt');

// Generate access token
const generateAccessToken = (employee) => {
  return jwt.sign({ id: employee._id, role: 'employee' }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
};

// Generate refresh token
const generateRefreshToken = (employee) => {
  return jwt.sign({ id: employee._id }, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
};

// Verify token
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
