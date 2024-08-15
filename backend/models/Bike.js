const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  bikeType: { type: String, enum: ['Bike 1', 'Bike 2', 'Bike 3'], required: true },
  assembledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  assemblyTime: { type: Number, required: true }, // Time in minutes
  assembledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bike', bikeSchema);
