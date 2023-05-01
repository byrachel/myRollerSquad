import React, { useEffect, useReducer } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import BusinessCard from "./BusinessCard";

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  768: 1,
};

const initialState = {
  cursor: 0,
  department: null,
  category: null,
  places: [],
};

const BusinessReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_PLACES":
      return {
        ...state,
        places: action.payload,
      };
    case "ADD_TO_MY_FAV":
      return {
        ...state,
        places: state.places.map((place: any) => {
          if (place.id === action.payload.id) {
            return {
              ...place,
              favorites: action.payload.favorites,
            };
          }
          return place;
        }),
      };
    default:
      return state;
  }
};

interface Props {
  dept: string | null;
  businessCategory: string | null;
}

const Business = ({ dept, businessCategory }: Props) => {
  const [businessStore, businessDispatch] = useReducer(
    BusinessReducer,
    initialState
  );
  const places = businessStore.places;

  const fetchPlaces = () => {
    const department = dept ? dept : "ALL";
    const category = businessCategory ? businessCategory : "ALL";
    axios({
      method: "get",
      url: `/api/business/${department}?category=${category}`,
    }).then((res) => {
      businessDispatch({
        type: "SET_PLACES",
        payload: res.data.places,
      });
    });
  };

  useEffect(() => {
    fetchPlaces();
    // eslint-disable-next-line
  }, [dept, businessCategory]);

  return (
    <div className="placeContainer">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {places && places.length > 0
          ? places.map((place: any) => (
              <BusinessCard
                place={place}
                key={place.id}
                businessDispatch={businessDispatch}
              />
            ))
          : null}
      </Masonry>
    </div>
  );
};
export default Business;
