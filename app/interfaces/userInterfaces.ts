import { PostInterface } from "./flowInterfaces";

export interface UserStateInterface {
  id: number;
  name: string;
  role: string;
}

export interface UserInterface {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string | null;
  posts?: PostInterface[];
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
  city: string | null;
}
