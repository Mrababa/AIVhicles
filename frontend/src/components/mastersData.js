// Sample master data used by the Masters Management demo pages.

export const sampleVehicleTypes = [
  {
    id: 1,
    nameEn: 'Light Vehicle',
    nameAr: 'مركبة خفيفة',
    code: 'LV',
    active: true,
  },
  {
    id: 2,
    nameEn: 'Motorcycle',
    nameAr: 'دراجة نارية',
    code: 'MC',
    active: true,
  },
];

export const sampleBodyTypes = [
  {
    id: 1,
    nameEn: 'SUV',
    nameAr: 'دفع رباعي',
    vehicleTypes: [1],
    active: true,
  },
  {
    id: 2,
    nameEn: 'Sedan',
    nameAr: 'سيدان',
    vehicleTypes: [1],
    active: true,
  },
];

export const sampleMakes = [
  {
    id: 1,
    nameEn: 'Toyota',
    nameAr: 'تويوتا',
    active: true,
    vehicleTypes: [1],
    logo: 'https://via.placeholder.com/40?text=T',
    frequent: true,
  },
  {
    id: 2,
    nameEn: 'Honda',
    nameAr: 'هوندا',
    active: true,
    vehicleTypes: [1, 2],
    logo: 'https://via.placeholder.com/40?text=H',
    frequent: false,
  },
];

export const sampleModels = [
  {
    id: 1,
    nameEn: 'Camry',
    nameAr: 'كامري',
    makeId: 1,
    vehicleTypeId: 1,
    modelYears: [2023, 2024],
    active: true,
  },
  {
    id: 2,
    nameEn: 'Civic',
    nameAr: 'سيفيك',
    makeId: 2,
    vehicleTypeId: 1,
    modelYears: [2022, 2023],
    active: false,
  },
];
export const sampleModelYearMasters = [
  { id: 1, year: 2024, active: true },
  { id: 2, year: 2023, active: true },
  { id: 3, year: 2022, active: false },
];

export const sampleModelYears = sampleModelYearMasters
  .filter((y) => y.active)
  .map((y) => y.year);

export const sampleWMIs = [
  {
    id: 1,
    code: 'JTD',
    makeId: 1,
    country: 'Japan',
    vehicleTypes: [1],
    active: true,
  },
  {
    id: 2,
    code: '1HG',
    makeId: 2,
    country: 'USA',
    vehicleTypes: [1],
    active: true,
  },
];

export const sampleFuelTypes = [
  { id: 1, name: 'Petrol' },
  { id: 2, name: 'Hybrid' },
];

export const sampleEngineSizes = [
  {
    id: 1,
    label: '2.0L',
    capacity: 1998,
    fuelTypeId: 1,
    vehicleTypes: [1],
    active: true,
  },
  {
    id: 2,
    label: '1.5L Hybrid',
    capacity: 1498,
    fuelTypeId: 2,
    vehicleTypes: [1],
    active: true,
  },
];

export const sampleTransmissions = [
  { id: 1, name: 'Automatic' },
  { id: 2, name: 'Manual' },
];

export const sampleTrims = [
  {
    id: 1,
    nameEn: 'LE',
    nameAr: 'إل إي',
    modelId: 1,
    year: 2024,
    vehicleTypeId: 1,
    transmissionId: 1,
    engineSizeId: 1,
    bodyTypeId: 2,
    active: true,
  },
  {
    id: 2,
    nameEn: 'Sport',
    nameAr: 'سبورت',
    modelId: 2,
    year: 2023,
    vehicleTypeId: 1,
    transmissionId: 2,
    engineSizeId: 2,
    bodyTypeId: 2,
    active: false,
  },
];
