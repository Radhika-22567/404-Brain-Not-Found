import API from './api';

export const uploadDocumentFile = async (file) => {
  const formData = new FormData();
  formData.append('document', file);
  const res = await API.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const fetchDocuments = async (params = {}) => {
  const res = await API.get('/documents', { params });
  return res.data;
};

export const fetchDocumentById = async (id) => {
  const res = await API.get(`/documents/${id}`);
  return res.data;
};

export const deleteDocumentFile = async (id) => {
  const res = await API.delete(`/documents/${id}`);
  return res.data;
};