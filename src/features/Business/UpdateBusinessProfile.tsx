import React, { useState } from "react";
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

  const [error, setError] = useState({ status: false, message: "" });
  const category = placeToUpdate
    ? businessCategory(placeToUpdate.category)
    : businessCategories[0];
  const [categorySelected, setCategorySelected] = useState(category);

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ status: false, message: "" });

    const target = event.target as typeof event.target & {
      name: { value: string };
      description: { value?: string };
      url: { value?: string };
      country: { value: string };
      department: { value?: string };
      city: { value?: string };
    };

    if (!target.name.value || !target.url.value)
      return setError({ status: true, message: E3 });

    const data = {
      name: target.name.value,
      description: target.description.value,
      url: target.url.value,
      country: target.country.value,
      county: target.department.value,
      city: target.city.value,
      category: categorySelected.value,
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
      .catch(() => setError({ status: true, message: E3 }));
  };

  return placeToUpdate ? (
    <>
      <ErrorLayout
        error={error.status}
        message={error.message}
        setError={setError}
      />
      <form onSubmit={onSumbit}>
        <BusinessProfileForm
          placeToUpdate={placeToUpdate}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
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
