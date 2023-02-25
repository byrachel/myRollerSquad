export interface PostInterface {
  id: number;
  title: string;
  content: string;
  user: any;
  place: any;
  created_at: Date;
  hashtags: string[];
  squad_ids: number[];
  link: string | null;
  pictures: string[];
  city?: string;
  country: string;
  location?: {
    latitude: string;
    longitude: string;
  };
  likes: number;
  comments: number;
  category_id: number;
  style_id: number;
}
