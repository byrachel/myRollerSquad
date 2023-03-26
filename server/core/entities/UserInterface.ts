export interface UserInterface {
  id: number;
  email: string;
  name: string;
  role: string;
  profile?: UserProfileInterface;
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
}

export interface UserProfileInterface {
  id: number;
  bio: string;
  social_medias: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  website: string;
  // pictures      String[]
  my_squad_ids: number[];
  my_followers: number[];
  roller_dance_level: number;
  skatepark_level: number;
  artistic_level: number;
  freestyle_level: number;
  urban_level: number;
}
