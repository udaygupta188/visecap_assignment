// ./components/DateFilter.js

import React, { useState } from "react";

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div className="flex flex-col p-4">
      <label className="mb-2">From:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <label className="mb-2">To:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleFilter}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default DateFilter;
