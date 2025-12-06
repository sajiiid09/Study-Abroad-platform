// frontend/src/services/api.ts
import api from '@/api/client';

export const getCourses = () => api.get('/courses');
export const getDestinations = () => api.get('/destinations');

export default api;
