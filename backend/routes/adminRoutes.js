const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get bikes assembled within a date range
router.get('/bikes-assembled', adminController.getBikesAssembled);

// Get employee production on a given day
router.get('/employee-production', adminController.getEmployeeProduction);

module.exports = router;
