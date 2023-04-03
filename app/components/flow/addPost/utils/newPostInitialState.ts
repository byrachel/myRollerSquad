import { NewPostInterface } from "app/interfaces/flowInterfaces";
import * as category from "app/constants/PostCategories";

export const newPostInitialState = {
  loading: false,
  error: { status: false, message: null, input: null },
  category: category.STORY,
  style: 0,
  city: null,
  country: "France",
  pictures: [],
  squad: [],
  displayLocation: false,
  position: undefined,
  content: "",
  map: null,
} as NewPostInterface;
