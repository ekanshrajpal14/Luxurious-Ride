export interface Brands {
  brand_name: string;
  brand_img: string;
  brand_id: number;
}

export interface FetchBrands {
  brands: Brands[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface CarPricing {
  id: number;
  car_id: number;
  base_price: number;
  duration_hours: number;
  included_km: number;
  extra_hour_charge: number;
  extra_km_charge: number;
  is_outstation: boolean;
}

export interface CarCategory {
  category: string;
}

export interface FuelType {
  fuel: string;
}
export interface Car {
  id: number;
  name: string;
  brand_id: number;
  model: string;
  color: string;
  seating_capacity: number;
  category_id: number;
  transmission: string | null;
  fuel_type_id: number;
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string

  CarsPricings: CarPricing[];
  CarCategory: CarCategory;
  FuelType: FuelType;
}

export interface FetchCars extends Pagination {
  cars: Car[];
  totalCars: number;
}
