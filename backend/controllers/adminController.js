const Bike = require('../models/Bike');

// Helper function to validate and convert date strings
const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// Get number of bikes assembled within a date range
exports.getBikesAssembled = async (req, res) => {
  const { fromDate, toDate } = req.query;

  try {
    const query = {};

    // Parse dates
    const startDate = parseDate(fromDate);
    const endDate = parseDate(toDate);

    // Apply date filters if valid dates are provided
    if (startDate && endDate) {
      query.assembledAt = { $gte: startDate, $lte: endDate };
    }

    // Fetch bikes based on the query
    const bikes = await Bike.find(query);

    res.status(200).json({ count: bikes.length, bikes });
  } catch (error) {
    console.error('Error fetching bikes:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get employee production on a given day
exports.getEmployeeProduction = async (req, res) => {
  const { date } = req.query;

  try {
    const query = {};

    // Parse date
    const targetDate = parseDate(date);

    // Apply date filter if valid date is provided
    if (targetDate) {
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.assembledAt = { $gte: startOfDay, $lte: endOfDay };
    }

    // Fetch bikes based on the query
    const bikes = await Bike.find(query).populate('assembledBy', 'name username');

    // Calculate employee production
    const production = bikes.reduce((acc, bike) => {
      const employee = bike.assembledBy.username;
      acc[employee] = (acc[employee] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({ production });
  } catch (error) {
    console.error('Error fetching employee production:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
