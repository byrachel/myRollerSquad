export interface PostInterface {
  id: number;
  title: string;
  content: string;
  hashtags: string[];
  created_at: Date;
  category_id: number;
  pictures: string[];
  link: string | null;
  style: { style_id: number }[];
  squad_ids: number[];
  city?: string;
  county?: string;
  country: string;
  user: {
    id: number;
    avatar: string | null;
    name: string;
    posts: { id: number; title: string }[];
  };
  user_likes: any[];
  comments: any[];
  price: number | null;
  distance: string | null;
  duration: string | null;
}

export interface UploadedPictureInterface {
  height: number;
  name: string;
  preview: string;
  size: number;
  type: string;
  width: number;
}

export interface NewPostInterface {
  loading: boolean;
  error: { status: boolean; message: null | string; input: string | null };
  category: number;
  style: number[];
  city: null | string;
  county: null | string;
  country: string;
  pictures: any[];
  squad: number[];
  displayLocation: boolean;
  content: string;
  map: Blob | null;
}

export interface EditPostInterface extends NewPostInterface {
  id: number;
  title: string;
  link: string | null;
  price: number | null;
  distance: number | null;
  duration: number | null;
  initialPictures: string[];
}

export interface NewPostFactoryInterface {
  title: string;
  content: string;
  category_id: number;
  link: string | null;
  style_ids: number[];
  squad_ids: number[];
  user_id: number;
  distance: number | null;
  duration?: number | null;
  price: number | null;
  city: string | null;
  county: string | null;
  country: string | null;
  pictures: string[]; // for edited post only
  place_id: number | null;
}
