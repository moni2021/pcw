export interface Vehicle {
  model: string;
  fuelTypes: string[];
}

export interface Part {
  name: string;
  price: number;
}

export interface Labor {
  name: string;
  charge: number;
}

export interface Service {
  parts: Part[];
  labor: Labor[];
}

export interface ServiceData {
  [key: string]: Service;
}

export interface ServiceEstimateData {
    vehicle: {
        model: string;
        fuelType: string;
    };
    serviceType: string;
    parts: Part[];
    labor: Labor[];
    totalPrice: number;
}
