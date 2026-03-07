import { javaClient } from './axiosConfig';

export const billingApi = {
  getHistory(page = 0, size = 10) {
    return javaClient.get('/billing', { params: { page, size } });
  },

  getInvoice(billingId) {
    return javaClient.get(`/billing/${billingId}`);
  },
};
