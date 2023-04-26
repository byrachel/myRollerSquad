import { NewPostInterface } from "src/interfaces/flowInterfaces";
import * as category from "src/constants/PostCategories";

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
} as NewPostInterface;
