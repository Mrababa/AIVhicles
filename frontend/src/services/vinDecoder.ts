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
 * Decodes a VIN and returns structured vehicle information.
 */
export async function decodeVin(vin: string): Promise<VinDecodeResult> {
  const res = await fetch(`/api/vin/decode?vin=${encodeURIComponent(vin)}`);
  if (!res.ok) {
    throw new Error('Decode failed');
  }
  return res.json();
}
