// src/utils/authUtils.js

// Get the access token from localStorage
export const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };
  
  // Set the access token in localStorage
  export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
  };
  
  // Remove the access token from localStorage
  export const removeAccessToken = () => {
    localStorage.removeItem('access_token');
  };
  
  // Check if the user is authenticated based on the token presence
  export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };
  