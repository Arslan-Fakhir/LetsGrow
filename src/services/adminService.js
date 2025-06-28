// src/services/adminService.js
import API from './api';

export const getAdminStats = async () => {
  try {
    const response = await API.get('/api/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};

export const getPendingStartups = async () => {
  try {
    const response = await API.get('/api/startups/getIdeas');
    return response.data.filter(startup => startup.status === 'pending');
  } catch (error) {
    console.error('Error fetching pending startups:', error);
    throw error;
  }
};