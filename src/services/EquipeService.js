import axios from 'axios';

const API_URL = 'http://localhost:8085/api/equipes';

// Fetch all equipes
export const listEquipes = () => {
  return axios.get(`${API_URL}`);
};

// Fetch a single equipe by ID
export const getEquipe = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Add a new equipe
export const addEquipe = (equipe) => {
  return axios.post(`${API_URL}`, equipe);
};

// Update an existing equipe
export const updateEquipe = (id, equipe) => {
  return axios.put(`${API_URL}/${id}`, equipe);
};

// Delete an equipe
export const deleteEquipe = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Delete all equipes
export const deleteAllEquipes = () => {
  return axios.delete(`${API_URL}`);
};

// Fetch equipes by page
export const listEquipesByPage = (page, size) => {
  return axios.get(`${API_URL}/page?page=${page}&size=${size}`);
};
