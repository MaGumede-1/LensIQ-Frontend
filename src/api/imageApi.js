import { pythonClient } from './axiosConfig';

export const imageApi = {
  uploadBatch(files, onProgress) {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    return pythonClient.post('/batches/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    });
  },

  getBatches() {
    return pythonClient.get('/batches');
  },

  getBatch(batchId) {
    return pythonClient.get(`/batches/${batchId}`);
  },

  getBatchImages(batchId, sortBy = 'score', order = 'desc') {
    return pythonClient.get(`/batches/${batchId}/images`, {
      params: { sortBy, order },
    });
  },

  getImage(imageId) {
    return pythonClient.get(`/images/${imageId}`);
  },

  deleteBatch(batchId) {
    return pythonClient.delete(`/batches/${batchId}`);
  },

  exportBestShots(batchId, threshold) {
    return pythonClient.post(
      `/batches/${batchId}/export`,
      { threshold },
      { responseType: 'blob' }
    );
  },
};
