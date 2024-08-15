const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const helper = require('../utils');
const { refreshTokenSecret } = require('../config/jwt');

// Authenticate employee
const authenticateEmployee = async (emailOrUsername, password) => {
  try {
    console.log(emailOrUsername);
    const admin = await Employee.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!admin) {
      throw new Error('Invalid email/username or password');
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid email/username or password');
    }

    return admin;
  } catch (error) {
    throw error;
  }
};

// Generate tokens
const generateTokens = async (admin) => {
  try {
    const accessToken = helper.generateAccessToken(admin);
    const refreshToken = helper.generateRefreshToken(admin);

    // Store the refresh token in the database
    admin.refreshToken = refreshToken;
    await admin.save();

    return { access_token: accessToken, refresh_token: refreshToken };
  } catch (error) {
    throw error;
  }
};

// Refresh tokens
const refreshTokens = async (refreshToken) => {
  try {
    const decoded = helper.verifyToken(refreshToken, refreshTokenSecret);
    const admin = await Employee.findById(decoded.id);

    if (!admin || admin.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    // Generate new tokens
    const accessToken = helper.generateAccessToken(admin);
    const newRefreshToken = helper.generateRefreshToken(admin);

    // Store the new refresh token in the database
    admin.refreshToken = newRefreshToken;
    await admin.save();

    return { access_token: accessToken, refresh_token: newRefreshToken };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateEmployee,
  generateTokens,
  refreshTokens
};
