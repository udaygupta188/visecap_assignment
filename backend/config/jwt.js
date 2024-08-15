require('dotenv').config();

module.exports = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'fnvSilentdksfhgEyefvng', 
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || '1h', 
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fnvSilentdksfhgEyefvngRefreshnfrn', 
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME || '7d',
};
