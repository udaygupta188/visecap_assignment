const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee'); 
const connectDB = require('../config/db');


const seedEmployees = async () => {
  try {
    await connectDB(); 

    await Employee.deleteMany();

    // Define employees data
    const employees = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10), // Hash the password
        role: 'Admin',
      },
      {
        name: 'Employee One',
        email: 'employee1@example.com',
        username: 'employee1',
        password: await bcrypt.hash('password123', 10),
        role: 'Employee',
      },
      {
        name: 'Employee Two',
        email: 'employee2@example.com',
        username: 'employee2',
        password: await bcrypt.hash('password123', 10),
        role: 'Employee',
      },
      {
        name: 'Employee Three',
        email: 'employee3@example.com',
        username: 'employee3',
        password: await bcrypt.hash('password123', 10),
        role: 'Employee',
      },
      {
        name: 'Employee Four',
        email: 'employee4@example.com',
        username: 'employee4',
        password: await bcrypt.hash('password123', 10),
        role: 'Employee',
      },
    ];

    // Insert employees into the database
    await Employee.insertMany(employees);

    console.log('Employees seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding employees:', error);
    process.exit(1);
  }
};

seedEmployees();
