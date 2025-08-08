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
