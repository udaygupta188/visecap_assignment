const authService = require('../services/authService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils'); // Importing helper functions

// Controller for admin login
const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const employee = await authService.authenticateEmployee(emailOrUsername, password);
    const tokens = await authService.generateTokens(employee);
    return apiSuccessResponse(res, 'User logged in successfully', tokens);
  } catch (error) {
    console.error('Admin Login error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.UNAUTHORIZED);
  }
};

// Controller to refresh tokens
const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return apiErrorResponse(res, 'No token provided', null, HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const tokens = await authService.refreshTokens(token);
    return apiSuccessResponse(res, 'Tokens refreshed successfully', tokens);
  } catch (error) {
    console.error('Refresh Token error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.FORBIDDEN);
  }
};

module.exports = {
  login,
  refreshToken
};
