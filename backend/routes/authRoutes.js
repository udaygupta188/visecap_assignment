
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyUser } = require('../middleware/authMiddleware');

router.post('/refresh-token', authController.refreshToken);
router.post('/login', authController.login);

module.exports = router;
