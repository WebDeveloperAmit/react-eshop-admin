import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/v1/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear(); // or be selective
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
