import { javaClient } from './axiosConfig';

export const authApi = {
  login(email, password) {
    return javaClient.post('/auth/login', { email, password });
  },

  register(data) {
    return javaClient.post('/auth/register', data);
  },

  logout() {
    return javaClient.post('/auth/logout');
  },

  me() {
    return javaClient.get('/auth/me');
  },
};
