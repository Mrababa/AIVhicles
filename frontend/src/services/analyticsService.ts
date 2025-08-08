import axios from 'axios';

const API = '/api/admin/analytics';

export async function getKpis() {
  const res = await axios.get(`${API}/kpis`);
  return res.data;
}

export async function getApiUsage() {
  const res = await axios.get(`${API}/api-usage`);
  return res.data;
}

export async function getRecentActivity() {
  const res = await axios.get(`${API}/recent-activity`);
  return res.data;
}

export async function getNewClients() {
  const res = await axios.get(`${API}/new-clients`);
  return res.data;
}
