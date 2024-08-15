import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
<>
<div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <nav className="flex flex-col mt-4">
        <Link to="/dashboard" className="p-4 hover:bg-gray-700">Dashboard</Link>
        <Link to="/bikes" className="p-4 hover:bg-gray-700">Bikes</Link>
        <Link to="/employees" className="p-4 hover:bg-gray-700">Employees</Link>
      </nav>
    </div>
    </>
  );
};

export default Sidebar;
