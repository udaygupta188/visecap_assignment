import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '../utils';


const EmployeeDashboard = () => {
  const [production, setProduction] = useState({});

  useEffect(() => {
    const fetchProduction = async () => {
      try {
        const token = getAccessToken();
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${baseUrl}/employee-production`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduction(response.data.production);
      } catch (error) {
        alert('Failed to fetch production data!');
      }
    };
    fetchProduction();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Employee Production</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="list-disc list-inside">
          {Object.entries(production).map(([employee, count]) => (
            <li key={employee} className="text-lg font-medium text-gray-700 mb-2">
              {employee}: <span className="font-semibold text-blue-600">{count} bikes</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
