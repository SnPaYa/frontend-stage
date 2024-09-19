// services/EmployeeService.js

import axios from 'axios';

const API_URL = 'http://localhost:8085/api/employees';

// Fetch all employees
export const listEmployees = () => {
  return axios.get(`${API_URL}`);
};

// Fetch a single employee by ID
export const getEmployee = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Add a new employee
export const addEmployee = (employee) => {
  return axios.post(`${API_URL}`, employee);
};

// Update an existing employee
export const updateEmployee = (id, employee) => {
  return axios.put(`${API_URL}/${id}`, employee);
};

// Delete an employee
export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
