import { PostInterface } from "./flowInterfaces";

export interface UserInterface {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string | null;
  posts?: PostInterface[];
  place: any;
  resume: string | null;
  my_followers: number[];
  my_squad_ids?: number[];
  pictures: string[];
  social_medias: any;
  website: string | null;
  roller_dance_level: number;
  skatepark_level: number;
  artistic_level: number;
  urban_level: number;
  freestyle_level: number;
  derby_level: number;
  country: string;
  county: string | null;
  city: string | null;
}

export interface PlaceInterface {
  id: number;
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  active: boolean;
  website: string;
  county: string;
  favorites: { id: number }[];
  user_id: number;
  siren: string;
  logo: string | null;
  category: string;
}
