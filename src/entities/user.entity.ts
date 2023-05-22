import { PostInterface } from "./flow.entity";

export interface UserInterface {
  id: number;
  active: boolean;
  name: string;
  role: string;
  email: string;
  avatar: string | null;
  resume: string | null;
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
  place: { id: number }[];
}

export interface UserFavs {
  id: number;
  name: string;
  category: "LEARN" | "BUY" | "PLAY" | "OTHER";
  logo: string | null;
}

export interface UserProfileInterface extends UserInterface {
  posts?: PostInterface[];
  favorite_places: UserFavs[];
  // posts_liked: { id: number }[];
}
