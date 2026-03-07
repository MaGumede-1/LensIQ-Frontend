import { useState, useEffect, useCallback } from 'react';
import { subscriptionApi } from '../api/subscriptionApi';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subRes, plansRes] = await Promise.all([
        subscriptionApi.getMySubscription().catch(() => ({ data: null })),
        subscriptionApi.getPlans(),
      ]);
      setSubscription(subRes.data);
      setPlans(plansRes.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { subscription, plans, loading, refetch: fetchData };
}
