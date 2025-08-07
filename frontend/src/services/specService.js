import axios from 'axios';

// Base URL for vehicle specification CRUD operations.
// The backend should expose REST endpoints matching these paths.
const API = '/api/specs';

// Retrieves all specifications for display in the admin dashboard.
export async function getSpecifications() {
  const res = await axios.get(API);
  return res.data;
}

// Retrieves a single specification for editing.
export async function getSpecification(id) {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
}

// Creates a new specification using the provided payload.
export async function createSpecification(data) {
  const res = await axios.post(API, data);
  return res.data;
}

// Updates an existing specification identified by id.
export async function updateSpecification(id, data) {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
}
