import axios from 'axios';
import { JAVA_API_BASE, PYTHON_API_BASE } from '../utils/constants';

function createClient(baseURL) {
  const client = axios.create({ baseURL });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );

  return client;
}

export const javaClient = createClient(JAVA_API_BASE);
export const pythonClient = createClient(PYTHON_API_BASE);
