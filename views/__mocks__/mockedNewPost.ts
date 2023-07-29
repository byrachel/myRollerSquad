import { SALE, STORY, TUTORIAL } from "views/constants/PostCategories";
import { DANCE, FREESTYLE } from "views/constants/RollerSkateStyles";

export const newStoryPost = {
  category_id: STORY,
  title: "Le pur bonheur",
  content: "<p>Ma dernière session au coucher du soleil !</p>",
  country: "France",
  county: "Alpes-Maritimes",
  city: "Cannes",
  distance: 1.2,
  duration: "01:20",
  link: "https://myrollersquad.com",
  place_id: null,
  user_id: 1,
  price: 200,
  style_ids: [FREESTYLE, DANCE],
  squad_ids: [],
  pictures: [],
};

export const newFactoryStoryPost = {
  category_id: STORY,
  title: "Le pur bonheur",
  content: "<p>Ma dernière session au coucher du soleil !</p>",
  country: "France",
  county: "Alpes-Maritimes",
  city: "Cannes",
  distance: 1.2,
  duration: "01:20",
  link: "https://myrollersquad.com",
  place_id: null,
  user_id: 1,
  style_ids: [FREESTYLE, DANCE],
  pictures: [],
};

export const newSalePost = {
  category_id: SALE,
  title: "A vendre",
  content: "<p>Super paire de Rollers</p>",
  country: "France",
  county: "Alpes-Maritimes",
  city: "Cannes",
  distance: 1.2,
  duration: "01:20",
  link: "https://myrollersquad.com",
  place_id: null,
  user_id: 1,
  price: 200,
  style_ids: [FREESTYLE, DANCE],
  squad_ids: [],
  pictures: [],
};

export const newFactorySalePost = {
  category_id: SALE,
  title: "A vendre",
  content: "<p>Super paire de Rollers</p>",
  country: "France",
  county: "Alpes-Maritimes",
  city: "Cannes",
  place_id: null,
  user_id: 1,
  style_ids: [FREESTYLE, DANCE],
  price: 200,
  pictures: [],
};

export const newPostByPlace = {
  category_id: TUTORIAL,
  title: "Tuto",
  content: "<p>Conseils pour débutants</p>",
  country: "France",
  county: null,
  city: null,
  distance: 1.2,
  duration: "01:20",
  link: "https://myrollersquad.com",
  place_id: 9,
  user_id: 1,
  price: 200,
  style_ids: [FREESTYLE, DANCE],
  squad_ids: [],
  pictures: [],
};

export const newFactoryPostByPlace = {
  category_id: TUTORIAL,
  title: "Tuto",
  content: "<p>Conseils pour débutants</p>",
  link: "https://myrollersquad.com",
  country: "France",
  county: null,
  city: null,
  place_id: 9,
  user_id: 1,
  style_ids: [FREESTYLE, DANCE],
  pictures: [],
};
