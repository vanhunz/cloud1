import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

/**
 * API để giao tiếp với Backend Spring Boot
 */

// Lấy toàn bộ tài nguyên (chưa phân loại)
export const getAllResources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resources`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// Phân loại toàn bộ tài nguyên
export const classifyResources = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/resources/classify`);
    return response.data;
  } catch (error) {
    console.error('Error classifying resources:', error);
    throw error;
  }
};

// Lấy thống kê
export const getStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resources/stats/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resources/health`);
    return response.data;
  } catch (error) {
    console.error('Error in health check:', error);
    throw error;
  }
};
