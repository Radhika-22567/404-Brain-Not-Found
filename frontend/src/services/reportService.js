import API from './api';

export const downloadDocumentReport = (documentId) => {
  const url = `${API.defaults.baseURL}/reports/${documentId}`;
  window.open(url, '_blank');
};