const express = require('express');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const bikeRoutes = require('./bikeRoutes');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/',authRoutes);
router.use('/',authenticateUser,adminRoutes);
router.use('/bike',authenticateUser,bikeRoutes);
// router.use('/metrics',metricsRoutes);

module.exports=router;