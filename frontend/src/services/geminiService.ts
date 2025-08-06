import axios from 'axios';

export interface VehicleFilters {
  make?: string;
  model?: string;
  yearFrom?: string;
  yearTo?: string;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  driveType?: string;
  [key: string]: any;
}

/**
 * Calls the backend Gemini service to search for vehicles.
 * The searchTerm is used to match vehicle make, model and category.
 */
export async function searchVehicles(filters: VehicleFilters, searchTerm = '') {
  const prompt = `Find vehicles matching these filters: ${JSON.stringify(filters)}.
Use the search term "${searchTerm}" to match against vehicle make, model, and category.
Return a JSON object with 'data' and 'total' fields.`;

  const response = await axios.post('http://localhost:8080/api/gemini/search', {
    prompt,
  });
  return response.data;
}
