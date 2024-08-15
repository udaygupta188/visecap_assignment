// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';
import Dashboard from './components/AdminDashboard'; // Example protected component
import BikeSelection from './components/BikeSelection';
import EmployeeDashboard from './components/EmployeeDashboard';
// import AnotherPage from './components/AnotherPage'; // Another example of a protected page

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/dashboard" />}
        />

        <Route
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
        >
          <Route
            element={<ProtectedLayout onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bikes" element={<BikeSelection />} />
            <Route path="/employees" element={<EmployeeDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
