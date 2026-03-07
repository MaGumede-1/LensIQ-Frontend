import { useState, useEffect, useCallback } from 'react';
import { imageApi } from '../api/imageApi';

export function useBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await imageApi.getBatches();
      setBatches(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load batches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  return { batches, loading, error, refetch: fetchBatches };
}

export function useBatchImages(batchId) {
  const [batch, setBatch] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!batchId) return;
    setLoading(true);
    setError(null);
    try {
      const [batchRes, imagesRes] = await Promise.all([
        imageApi.getBatch(batchId),
        imageApi.getBatchImages(batchId),
      ]);
      setBatch(batchRes.data);
      setImages(imagesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load batch');
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { batch, images, loading, error, refetch: fetchData };
}
