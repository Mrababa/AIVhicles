// Static lists used for client-side filtering in the catalog.
// In production these options could be fetched from the backend to
// ensure they reflect the actual dataset.
export const MAKES = [
  'Toyota',
  'Honda',
  'Nissan',
  'Ford',
  'Chevrolet',
];

// Years supported by the catalog search form.
// Generated locally but should come from the API to automatically
// include new model years without redeploying.
export const YEARS = Array.from({ length: 35 }, (_, i) => 2024 - i);

// Basic body style categories displayed to the user.
// The backend should translate these values to its own taxonomy when
// filtering results.
export const CATEGORIES = [
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Convertible',
];

