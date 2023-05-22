import { PlaceInterface } from "src/entities/business.entity";

export interface BusinessUseCase {
  getPlaces: (category: string, dept: string) => Promise<PlaceInterface[]>;
  updatePlace: (data: PlaceInterface) => Promise<PlaceInterface>;
  createPlace: (data: PlaceInterface) => Promise<PlaceInterface>;
  deletePlace: (id: number) => Promise<void>;
}
