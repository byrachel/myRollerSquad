import axios from "axios";
import React, { useEffect, useState } from "react";
import BusinessProfileForm from "./BusinessProfileForm";
import {
  businessCategories,
  businessCategory,
} from "src/constants/BusinessCategories";
import { useRouter } from "next/router";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import RegularButton from "@/components/buttons/RegularButton";
import { PlaceInterface } from "src/entities/business.entity";
import { E1, E3 } from "src/constants/ErrorMessages";

interface Props {
  placeId: number;
  userConnectedId: number;
}

export default function UpdateBusinessProfile({
  placeId,
  userConnectedId,
}: Props) {
  const router = useRouter();
  const [placeToUpdate, setPlaceToUpdate] = useState<PlaceInterface | null>(
    null
  );
  const [error, setError] = useState({ status: false, message: "" });
  const category = placeToUpdate
    ? businessCategory(placeToUpdate.category)
    : businessCategories[0];
  const [categorySelected, setCategorySelected] = useState(category);

  useEffect(() => {
    axios(`/api/business/place/${placeId}`, {
      method: "GET",
      withCredentials: true,
    }).then((res) => setPlaceToUpdate(res.data.place));
    // eslint-disable-next-line
  }, [placeId]);

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
      method: "POST",
      url: `/api/business/update`,
      data,
      withCredentials: true,
    })
      .then(() => router.push(`/profile/${userConnectedId}`))
      .catch((err) => {
        setError({ status: true, message: err.response.data.message ?? E1 });
      });
  };

  return placeToUpdate ? (
    <>
      <h2>Mettre à jour :</h2>
      <div className="lightSeparator mt5" />
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
  ) : null;
}
