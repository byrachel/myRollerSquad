import React, { useEffect, useReducer } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  768: 1,
};

const initialState = {
  cursor: 0,
  department: null,
  places: [],
};

const BusinessReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_DEPT":
      return {
        ...state,
        department: action.payload,
        cursor: 0,
        places: [],
      };
    case "SET_PLACES":
      return {
        ...state,
        places: action.payload.places,
        cursor: action.payload.cursor,
      };
    case "SET_CURSOR":
      return {
        ...state,
        cursor: action.payload,
      };
    default:
      return state;
  }
};

const Business = () => {
  const [businessStore, businessDispatch] = useReducer(
    BusinessReducer,
    initialState
  );
  const places = businessStore.places;

  const nextId = businessStore.cursor ? businessStore.cursor : 0;
  const department = businessStore.department
    ? `dept=${businessStore.department}`
    : `dept=`;

  const fetchPlaces = () => {
    axios({
      method: "get",
      url: `/api/business/dept?cursor=${nextId}&${department}`,
      withCredentials: true,
    })
      .then((res) => {
        businessDispatch({
          type: "SET_PLACES",
          payload: {
            places: [...businessStore.places, ...res.data.places],
            cursor: res.data.nextId ? res.data.nextId : null,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPlaces();
    // eslint-disable-next-line
  }, [department]);

  //   const newLimit = () => {
  //     fetchPlaces();
  //   };

  return (
    <>
      <div className="responsiveFlowContainer">
        <div className="flowContainer">
          {/* <FlowFilters flowStore={flowStore} flowDispatch={flowDispatch} /> */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {places && places.length > 0
              ? places.map((place: any) => <p key={place.id}>{place.name}</p>)
              : null}
          </Masonry>
        </div>
      </div>
    </>
  );
};
export default Business;
