const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

// Employee assembles a bike
router.post('/assemble', bikeController.assembleBike);

module.exports = router;
