import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MyChart from "./MyChart";
import { getAccessToken } from "../utils";

const AdminDashboard = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bikes Assembled",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        data: [],
      },
    ],
  });

  const [employeeData, setEmployeeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Employee Production",
        backgroundColor: "rgb(153, 102, 255)",
        borderColor: "rgb(153, 102, 255)",
        data: [],
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = getAccessToken();
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseUrl}/bikes-assembled`, {
        params: { fromDate, toDate },
        headers: { Authorization: `Bearer ${token}` },
      });

      const bikes = response.data.bikes;

      // Process data for bikes assembled chart
      const bikeTypes = [...new Set(bikes.map((bike) => bike.bikeType))];
      const bikeCounts = bikeTypes.map((type) =>
        bikes.filter((bike) => bike.bikeType === type).length
      );

      setChartData({
        labels: bikeTypes,
        datasets: [
          {
            label: "Bikes Assembled",
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgb(75, 192, 192)",
            data: bikeCounts,
          },
        ],
      });

      // Process data for employee production chart (if available)
      const employees = [...new Set(bikes.map((bike) => bike.assembledBy))];
      const employeeCounts = employees.map((emp) =>
        bikes.filter((bike) => bike.assembledBy === emp).length
      );

      setEmployeeData({
        labels: employees,
        datasets: [
          {
            label: "Employee Production",
            backgroundColor: "rgb(153, 102, 255)",
            borderColor: "rgb(153, 102, 255)",
            data: employeeCounts,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    fetchData();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            placeholderText="Start Date"
            className="border border-gray-300 rounded-md p-2"
          />
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            placeholderText="End Date"
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Filter
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Bikes Assembled</h3>
            <MyChart chartData={chartData} />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Employee Production</h3>
            <MyChart chartData={employeeData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
