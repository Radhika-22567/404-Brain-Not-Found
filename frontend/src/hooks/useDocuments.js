import { useState, useEffect, useCallback } from 'react';
import { fetchDocuments } from '../services/documentService';

export const useDocuments = (initialParams = {}) => {
  const [documents, setDocuments] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1, totalDocuments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDocuments = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await fetchDocuments({ ...initialParams, ...params });
      setDocuments(res.data.documents);
      setPagination({
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
        totalDocuments: res.data.totalDocuments
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return { documents, pagination, loading, error, refetch: loadDocuments };
};