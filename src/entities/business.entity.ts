import { PostInterface } from "./flow.entity";
import { UserInterface } from "./user.entity";

export interface MiniPlaceInterface {
  id: number;
  name: string;
  active: boolean;
  county: string | null;
  description: string | null;
  logo: string | null;
  _count?: { posts: number };
  favorites?: { id: number }[];
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
  posts?: PostInterface[];
}
