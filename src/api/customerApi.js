import { javaClient } from './axiosConfig';

export const customerApi = {
  getProfile() {
    return javaClient.get('/customers/me');
  },

  updateProfile(data) {
    return javaClient.put('/customers/me', data);
  },
};
