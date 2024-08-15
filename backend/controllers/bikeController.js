const Bike = require('../models/Bike');
const Employee = require('../models/Employee');

// Bike Assembly Function
exports.assembleBike = async (req, res) => {
  const { bikeType } = req.body;

  try {
    // Determine assembly time based on bike type
    let assemblyTime;
    switch (bikeType) {
      case 'Bike 1':
        assemblyTime = 50;
        break;
      case 'Bike 2':
        assemblyTime = 60;
        break;
      case 'Bike 3':
        assemblyTime = 80;
        break;
      default:
        return res.status(400).json({ message: 'Invalid bike type' });
    }

    // Create new bike record
    const newBike = new Bike({
      bikeType,
      assembledBy: req.employee._id, // Assuming `req.user` contains the authenticated user
      assemblyTime,
    });

    await newBike.save();

    res.status(201).json({ message: 'Bike assembled successfully', bike: newBike });
  } catch (error) {
    console.error('Error assembling bike:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
