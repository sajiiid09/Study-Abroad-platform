// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches backend port
});

export const getCourses = () => api.get('/courses');
export const getDestinations = () => api.get('/destinations');

export default api;
