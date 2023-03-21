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
  avatar: string;
  posts: PostInterface[];
  profile: {
    bio: string;
    my_followers: number[];
    my_squad_ids: number[];
    pictures: string[];
    social_medias: { instagram: string };
    website: string;
  } | null;
}
