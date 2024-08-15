const mongoose = require('mongoose');
const Bike = require('../models/Bike');
const Employee = require('../models/Employee');
const connectDB = require('../config/db');

const bikesSeed = async () => {
    connectDB();

  const employee = await Employee.findOne();

  if (!employee) {
    console.error('No employee found. Please seed employee data first.');
    mongoose.connection.close();
    return;
  }

  const bikes = [
    { bikeType: 'Bike 1', assembledBy: employee._id, assemblyTime: 50 },
    { bikeType: 'Bike 2', assembledBy: employee._id, assemblyTime: 60 },
    { bikeType: 'Bike 3', assembledBy: employee._id, assemblyTime: 80 },
  ];

  try {
    await Bike.insertMany(bikes);
    console.log('Bike data seeded successfully');
  } catch (error) {
    console.error('Error seeding bike data:', error);
  }
};

bikesSeed();