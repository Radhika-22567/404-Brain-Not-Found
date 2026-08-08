import API from './api';

export const submitManualReview = async (id, status, notes) => {
  const res = await API.post(`/verification/${id}/review`, { status, notes });
  return res.data;
};

export const fetchVerificationHistory = async (id) => {
  const res = await API.get(`/verification/${id}/history`);
  return res.data;
};