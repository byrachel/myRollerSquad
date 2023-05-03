import { STORY, SALE } from "src/constants/PostCategories";
import { NewPostFactoryInterface } from "src/interfaces/flowInterfaces";

class StoryPost {
  title;
  content;
  user_id;
  duration;
  distance;
  link;
  country;
  county;
  city;
  category_id;
  style_ids;
  constructor(newPost: NewPostFactoryInterface) {
    this.title = newPost.title;
    this.content = newPost.content;
    this.user_id = newPost.user_id;
    this.duration = newPost.duration;
    this.distance = newPost.distance;
    this.link = newPost.link;
    this.country = newPost.country;
    this.county = newPost.county;
    this.category_id = newPost.category_id;
    this.style_ids = newPost.style_ids;
    this.city = newPost.city;
  }
}

class ResalePost {
  title;
  content;
  user_id;
  price;
  country;
  county;
  category_id;
  style_ids;
  city;
  constructor(newPost: NewPostFactoryInterface) {
    this.title = newPost.title;
    this.content = newPost.content;
    this.user_id = newPost.user_id;
    this.price = newPost.price;
    this.country = newPost.country;
    this.category_id = newPost.category_id;
    this.style_ids = newPost.style_ids;
    this.city = newPost.city;
    this.county = newPost.county;
  }
}

class OtherPost {
  title;
  content;
  user_id;
  link;
  category_id;
  style_ids;
  country;
  county;
  city;
  constructor(newPost: NewPostFactoryInterface) {
    this.title = newPost.title;
    this.content = newPost.content;
    this.user_id = newPost.user_id;
    this.link = newPost.link;
    this.category_id = newPost.category_id;
    this.style_ids = newPost.style_ids;
    this.country = newPost.country;
    this.city = newPost.city;
    this.county = newPost.county;
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