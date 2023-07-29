import { NewPostInterface } from "models/entities/flow.entity";
import * as category from "views/constants/PostCategories";
import { OTHER } from "views/constants/RollerSkateStyles";

export const newPostInitialState = {
  loading: false,
  error: { status: false, message: null, input: null },
  category: category.STORY,
  style: [OTHER],
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
