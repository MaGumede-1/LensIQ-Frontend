import { javaClient } from './axiosConfig';

export const subscriptionApi = {
  getPlans() {
    return javaClient.get('/subscriptions/plans');
  },

  getMySubscription() {
    return javaClient.get('/subscriptions/me');
  },

  subscribe(planId) {
    return javaClient.post('/subscriptions', { planId });
  },

  cancel() {
    return javaClient.post('/subscriptions/cancel');
  },

  pause() {
    return javaClient.post('/subscriptions/pause');
  },

  resume() {
    return javaClient.post('/subscriptions/resume');
  },

  createCheckoutSession(planId) {
    return javaClient.post('/subscriptions/checkout', { planId });
  },
};
