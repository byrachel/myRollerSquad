export interface UserPostInterface {
  id: number;
  user_id: number;
  place_id: number | null;
  title: string;
  category_id: number;
  style?: {
    style_id: number;
  }[];
  created_at: Date;
  pictures: string[];
  comments?: {
    id: number;
  }[];
  user_likes?: {
    user_id: number;
  }[];
}

export interface PostInterface {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  category_id: number;
  pictures: string[];
  link: string | null;
  style: { style_id: number }[];
  city: string | null;
  county: string | null;
  country: string;
  user_likes: { user_id: number }[];
  price: number | null;
  distance: any | null;
  duration: string | null;
  place_id?: number | null;
  comments: any[];
  user?: {
    id: number;
    avatar: string | null;
    name: string;
  };
  place?: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
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
  place_id: number | null;
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
  duration?: string | null;
  price: number | null;
  city: string | null;
  county: string | null;
  country: string | null;
  pictures: string[]; // for edited post only
  place_id: number | null;
}

export interface CommentInterface {
  id: number;
  comment: string;
  published_at: Date;
  author: {
    id: number;
    name: string;
  };
  post_id: number;
}

export interface CompletePostInterface {
  id: number;
  title: string;
  // slug?: string;
  content: string;
  created_at: Date;
  category_id: number;
  pictures: string[];
  link: string | null;
  style: { style_id: number }[];
  city: string | null;
  county: string | null;
  country: string;
  user_likes?: { user_id: number }[];
  price: number | null;
  distance: any | null;
  duration: string | null;
  comments?: any[];
  user?: {
    id: number;
    avatar: string | null;
    name: string;
  };
  place?: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
}

export interface GetPostsResponseInterface {
  posts: CompletePostInterface[];
  nextId: number;
}

export interface BodyPostInterface {
  title: string;
  content: string;
  category_id: string;
  link: string | null;
  style_ids: number[];
  squad_ids: number[];
  user_id: number;
  distance: number | null;
  duration?: string | null;
  price: string | null;
  city: string | null;
  county: string | null;
  country: string | null;
  pictures: string[]; // for edited post only
  place_id: string | null;
}

export interface BodyUpdatePostInterface {
  title: string;
  content: string;
  category_id: number;
  link: string | null;
  style_ids: number[];
  squad_ids: number[];
  user_id: number;
  distance: number | null;
  duration?: string | null;
  price: string | null;
  city: string | null;
  county: string | null;
  country: string | null;
  pictures: string[]; // for edited post only
  place_id: number | null;
}
