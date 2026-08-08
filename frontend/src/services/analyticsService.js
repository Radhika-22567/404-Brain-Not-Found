import API from './api';

export const fetchAnalyticsOverview = async () => {
  const res = await API.get('/analytics/overview');
  return res.data;
};