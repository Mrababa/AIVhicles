export interface VehicleTypeMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  code: string;
  active: boolean;
}

export interface BodyTypeMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  vehicleTypes: number[]; // associated vehicle type ids
  active: boolean;
}

export interface ModelMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  makeId: number;
  vehicleTypeId: number;
  modelYears?: number[];
  active: boolean;
}

export interface WmiMaster {
  id: number;
  code: string;
  makeId: number;
  country: string;
  vehicleTypes?: number[];
  active: boolean;
}

export interface ModelYearMaster {
  id: number;
  year: number;
  active: boolean;
}

export interface TrimMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  modelId: number;
  year: number;
  vehicleTypeId: number;
  transmissionId?: number;
  engineSizeId?: number;
  bodyTypeId?: number;
  active: boolean;
}

export interface EngineSizeMaster {
  id: number;
  label: string;
  capacity?: number;
  fuelTypeId?: number;
  vehicleTypes?: number[];
  active: boolean;
}

export interface TransmissionMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  abbreviation?: string;
  vehicleTypes?: number[];
  active: boolean;
}

export interface RegionMaster {
  id: number;
  name: string;
  countries?: string;
  active: boolean;
}

export interface SeatMaster {
  id: number;
  count: number;
  label?: string;
  vehicleTypes?: number[];
  active: boolean;
}

export interface DoorMaster {
  id: number;
  count: number;
  vehicleTypes?: number[];
  active: boolean;
}

export interface CylinderMaster {
  id: number;
  count: number;
  engineType?: string;
  vehicleTypes?: number[];
  active: boolean;
}

export interface FuelTypeMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  iconUrl?: string;
  vehicleTypes?: number[];
  active: boolean;
}

export interface CategoryMaster {
  id: number;
  name: string;
  description?: string;
  vehicleTypeId: number;
  active: boolean;
}

export interface DepreciationMaster {
  id: number;
  yearRange: string;
  rate: number;
  vehicleTypeId: number;
  categoryId?: number;
  active: boolean;
}

export interface DriveTrainMaster {
  id: number;
  nameEn: string;
  nameAr: string;
  description?: string;
  vehicleTypes?: number[];
  active: boolean;
}
