import axios from 'axios';

const API = '/api/specs';

export async function getSpecifications() {
  const res = await axios.get(API);
  return res.data;
}

export async function getSpecification(id) {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
}

export async function createSpecification(data) {
  const res = await axios.post(API, data);
  return res.data;
}

export async function updateSpecification(id, data) {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
}
