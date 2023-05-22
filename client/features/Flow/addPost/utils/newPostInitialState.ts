import { NewPostInterface } from "client/entities/flow.entity";
import * as category from "client/constants/PostCategories";

export const newPostInitialState = {
  loading: false,
  error: { status: false, message: null, input: null },
  category: category.STORY,
  style: [],
  city: null,
  county: null,
  country: "France",
  pictures: [],
  squad: [],
  displayLocation: false,
  content: "",
  map: null,
  place_id: null,
} as NewPostInterface;
