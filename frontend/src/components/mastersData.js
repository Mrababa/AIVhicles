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

export const sampleMakes = [
  { id: 1, nameEn: 'Toyota', nameAr: 'تويوتا', active: true, vehicleTypes: [1] },
  { id: 2, nameEn: 'Honda', nameAr: 'هوندا', active: true, vehicleTypes: [1, 2] },
];
