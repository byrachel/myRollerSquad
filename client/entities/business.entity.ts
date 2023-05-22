import { PostInterface } from "./flow.entity";
import { UserInterface } from "./user.entity";

export interface MiniPlaceInterface {
  id: number;
  name: string;
  active: boolean;
  city: string | null;
  description: string | null;
  logo: string | null;
}

export interface PlaceInterface extends MiniPlaceInterface {
  siren: string;
  county: string | null;
  country: string;
  type: "ASSOCIATION" | "PROFESSIONAL";
  website: string | null;
  owner?: UserInterface;
  user_id: number;
  category: "LEARN" | "BUY" | "PLAY" | "OTHER";
  favorites?: { id: number }[];
  posts?: PostInterface[];
  _count?: { posts: number };
}
