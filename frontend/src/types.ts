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
