/**
 * Client-side helper for calling the Gemini vision model. The backend should
 * ideally proxy these requests so API keys are not exposed to the browser.
 * Returns structured vehicle information and optional damage estimates.
 */
export interface VehicleSpecs {
  [key: string]: string;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  bodyType: string;
  marketValueAED: number;
  description: string;
  specs: VehicleSpecs;
}

export interface DamageItem {
  part: string;
  cost: number;
}

export interface DamageReport {
  totalMinAED: number;
  totalMaxAED: number;
  summary: string;
  items: DamageItem[];
  partsTotalAED: number;
  laborAED: number;
}

export interface AIInspectionResult {
  vehicle: VehicleInfo;
  damage?: DamageReport;
}

const inspectionPrompt = `You are an AI vehicle inspector. Analyze the provided car image and return a JSON object that adheres to the given schema. Identify vehicle make, model, year and body type, estimate market value in AED, give a short description and list notable specs. If damage is visible, estimate repair costs with a breakdown and totals.`;

const inspectionSchema = {
  type: 'object',
  properties: {
    vehicle: {
      type: 'object',
      properties: {
        make: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        bodyType: { type: 'string' },
        marketValueAED: { type: 'number' },
        description: { type: 'string' },
        specs: { type: 'object', additionalProperties: { type: 'string' } },
      },
      required: ['make', 'model', 'year', 'bodyType', 'marketValueAED', 'description', 'specs'],
    },
    damage: {
      type: 'object',
      properties: {
        totalMinAED: { type: 'number' },
        totalMaxAED: { type: 'number' },
        summary: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              part: { type: 'string' },
              cost: { type: 'number' },
            },
            required: ['part', 'cost'],
          },
        },
        partsTotalAED: { type: 'number' },
        laborAED: { type: 'number' },
      },
      required: ['totalMinAED', 'totalMaxAED', 'summary', 'items', 'partsTotalAED', 'laborAED'],
    },
  },
  required: ['vehicle'],
  additionalProperties: false,
};

/**
 * Calls the Gemini API with an image and returns the structured inspection result.
 */
export async function inspectVehicleFromImage(file: File): Promise<AIInspectionResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const base64 = await toBase64(file);

  const body = {
    contents: [
      {
        parts: [
          { text: inspectionPrompt },
          { inline_data: { mime_type: file.type, data: base64 } },
        ],
      },
    ],
    response_mime_type: 'application/json',
    response_schema: inspectionSchema,
  };

  const res = await fetch(
    // Direct call to Google's Generative Language API.
    // Consider routing through the backend to avoid exposing API keys.
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    throw new Error('Could not get an estimate.');
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

// Utility to convert a File to a base64 string for API submission.
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
