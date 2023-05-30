import React, { useReducer } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";

import BusinessProfileForm from "./BusinessProfileForm";
import {
  businessCategories,
  businessCategory,
} from "src/constants/BusinessCategories";
import ErrorLayout from "src/components/layouts/ErrorLayout";
import RegularButton from "src/components/buttons/RegularButton";
import { PlaceInterface } from "src/entities/business.entity";
import { E3 } from "src/constants/ErrorMessages";
import { useProfile } from "src/hooks/useProfile";
import { BusinessReducer } from "src/reducers/BusinessReducer";

interface Props {
  placeId: number;
  userConnectedId: number;
}

export default function UpdateBusinessProfile({
  placeId,
  userConnectedId,
}: Props) {
  const router = useRouter();

  const { userPlaces, updateUserPlace } = useProfile(
    (state) => ({
      userPlaces: state.userPlaces,
      updateUserPlace: state.updateUserPlace,
    }),
    shallow
  );

  const placeToUpdate = userPlaces?.find(
    (place: PlaceInterface) => place.id === placeId
  );
  const category = placeToUpdate
    ? businessCategory(placeToUpdate.category)
    : businessCategories[0];

  const initialState = {
    description: placeToUpdate ? placeToUpdate.description : "",
    category: category,
    error: { status: false, message: "" },
  };

  console.log(placeToUpdate);

  const [businessState, dispatchBusinessState] = useReducer(
    BusinessReducer,
    initialState
  );

  // const [error, setError] = useState({ status: false, message: "" });
  // const [categorySelected, setCategorySelected] = useState(category);

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setError({ status: false, message: "" });
    dispatchBusinessState({ type: "HIDE_ERROR", payload: {} });

    const target = event.target as typeof event.target & {
      name: { value: string };
      url: { value?: string };
      country: { value: string };
      department: { value?: string };
    };

    if (!target.name.value || !target.url.value)
      // return setError({ status: true, message: E3 });
      return dispatchBusinessState({
        type: "ERROR",
        payload: { status: true, message: E3 },
      });

    const data = {
      name: target.name.value,
      description: businessState.description,
      url: target.url.value,
      country: target.country.value,
      county: target.department.value,
      category: businessState.category.value,
      placeId: placeId,
    };
    axios({
      method: "PUT",
      url: `/api/business/update/${userConnectedId}`,
      data,
      withCredentials: true,
    })
      .then((res) => {
        updateUserPlace(res.data.place);
        router.push(`/profile/places/${userConnectedId}`);
      })
      .catch((err) => {
        dispatchBusinessState({
          type: "ERROR",
          payload: {
            status: true,
            message: err.response.data.message ?? E3,
          },
        });
      });
  };

  return placeToUpdate ? (
    <>
      <ErrorLayout
        error={businessState.error.status}
        message={businessState.error.message}
        dispatchError={dispatchBusinessState}
      />
      <form onSubmit={onSumbit}>
        <BusinessProfileForm
          businessState={businessState}
          dispatchBusinessState={dispatchBusinessState}
          placeToUpdate={placeToUpdate}
          isUpdate
        />
        <div className="mt5" />
        <RegularButton type="submit" text="valider" style="full" />
      </form>
    </>
  ) : (
    <p>Oups ! Il n'y a rien à mettre à jour ici...</p>
  );
}
