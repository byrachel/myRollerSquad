export interface UserInterface {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "USER" | "PRO";
  // posts         Post[]      @relation("post_author")
  // places        Place[]     @relation("favorite_places")
  rgpd: boolean;
  rgpd_ok_at: Date | null;
  avatar: string | null;
  password: string | null;
  // refreshTokens RefreshToken[]
  createdAt: Date;
  updatedAt: Date;
  country: string;
  city: string | null;

  social_medias?: {} | null;

  website?: string | null;

  my_squad: number[];
  my_followers: number[];

  roller_dance_level: number;
  skatepark_level: number;
  artistic_level: number;
  freestyle_level: number;
  urban_level: number;
  derby_level: number;
}
