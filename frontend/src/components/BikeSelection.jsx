import React from 'react';
import axios from 'axios';
import { getAccessToken } from '../utils';


const BikeSelection = () => {
  const handleBikeSelection = async (bikeType) => {
    try {
      const token = getAccessToken();
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(`${baseUrl}/bike/assemble`, { bikeType }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Show success message
      alert(`Bike assembly started: ${response.data.message}`);
    } catch (error) {
      // Handle specific error messages
      const errorMessage = error.response?.data?.message || 'Failed to start assembly!';
      alert(errorMessage);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Select a Bike to Assemble</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => handleBikeSelection('Bike 1')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Bike 1
        </button>
        <button
          onClick={() => handleBikeSelection('Bike 2')}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
        >
          Bike 2
        </button>
        <button
          onClick={() => handleBikeSelection('Bike 3')}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
        >
          Bike 3
        </button>
      </div>
    </div>
  );
};

export default BikeSelection;
