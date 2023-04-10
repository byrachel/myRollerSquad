import { STORY, SALE } from "app/constants/PostCategories";
import { NewPostFactoryInterface } from "app/interfaces/flowInterfaces";

class StoryPost {
  title;
  content;
  user_id;
  duration;
  distance;
  link;
  country;
  city;
  position;
  category_id;
  style_id;
  constructor(newPost: NewPostFactoryInterface) {
    this.title = newPost.title;
    this.content = newPost.content;
    this.user_id = newPost.user_id;
    this.duration = newPost.duration;
    this.distance = newPost.distance;
    this.link = newPost.link;
    this.country = newPost.country;
    this.category_id = newPost.category_id;
    this.style_id = newPost.style_id;
    this.position = newPost.position;
    this.city = newPost.city;
  }
}

class ResalePost {
  title;
  content;
  user_id;
  price;
  country;
  category_id;
  style_id;
  city;
  constructor(newPost: NewPostFactoryInterface) {
    this.title = newPost.title;
    this.content = newPost.content;
    this.user_id = newPost.user_id;
    this.price = newPost.price;
    this.country = newPost.country;
    this.category_id = newPost.category_id;
    this.style_id = newPost.style_id;
    this.city = newPost.city;
  }
}

class OtherPost {
  title;
  content;
  user_id;
  link;
  category_id;
  style_id;
  country;
  city;
  constructor(newPost: NewPostFactoryInterface) {
    this.title = newPost.title;
    this.content = newPost.content;
    this.user_id = newPost.user_id;
    this.link = newPost.link;
    this.category_id = newPost.category_id;
    this.style_id = newPost.style_id;
    this.country = newPost.country;
    this.city = newPost.city;
  }
}

export class NewPostFactory {
  create = (newPost: NewPostFactoryInterface) => {
    let post;
    if (newPost.category_id === STORY) {
      post = new StoryPost(newPost);
    } else if (newPost.category_id === SALE) {
      post = new ResalePost(newPost);
    } else {
      post = new OtherPost(newPost);
    }
    return post;
  };
}
