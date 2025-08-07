// Interface describing the data returned by the VIN decoder API.
export interface VinDecodeResult {
  year: number;
  make: string;
  model: string;
  valuation: number;
  country: string;
  bodyType: string;
  fuelType: string;
  engine: string;
  imageUrl?: string;
  summary?: string;
}

/**
 * Calls the backend VIN decoding endpoint and returns structured vehicle
 * information. Backend should validate the VIN and supply additional
 * fields like valuation and engine details.
 */
export async function decodeVin(vin: string): Promise<VinDecodeResult> {
  const res = await fetch(`/api/vin/decode?vin=${encodeURIComponent(vin)}`);
  if (!res.ok) {
    throw new Error('Decode failed');
  }
  return res.json();
}
