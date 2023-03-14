export interface PostInterface {
  id: number;
  title: string;
  content: string;
  hashtags: string[];
  created_at: Date;
  category_id: number;
  pictures: string[];
  link: string | null;
  style_id: number;
  squad_ids: number[];
  city?: string;
  country: string;
  user: { id: number; name: string };
  likes: number;
  comments: any[];
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
  style: null | number;
  city: null | string;
  country: string;
  pictures: UploadedPictureInterface[];
  squad: number[];
  displayLocation: boolean;
  position: [number, number] | undefined;
  content: string;
}

export interface NewPostFactoryInterface {
  title: string;
  content: string;
  hashtags: string[];
  category_id: number;
  pictures: string[];
  link: string | null;
  style_id: number;
  squad_ids: number[];
  user_id: number;
  distance: number;
  duration: number;
  country: string;
  position: [number, number] | undefined;
  price: number | null;
}
