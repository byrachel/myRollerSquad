import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import RegularButton from "@/components/buttons/RegularButton";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import BusinessProfileForm from "./BusinessProfileForm";
import { E1, E3 } from "src/constants/ErrorMessages";
import { businessCategories } from "src/constants/BusinessCategories";

interface Props {
  ownerId: number;
}

const AddBusinessProfile = ({ ownerId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });
  const [categorySelected, setCategorySelected] = useState(
    businessCategories[0]
  );

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ status: false, message: "" });

    const target = event.target as typeof event.target & {
      siren: { value: string };
      name: { value: string };
      description: { value?: string };
      url: { value?: string };
      type: { value: string };
      country: { value: string };
      department: { value?: string };
      city: { value?: string };
    };

    if (
      !target.siren.value ||
      !target.name.value ||
      !target.type.value ||
      !target.url.value
    )
      return setError({ status: true, message: E3 });

    const data = {
      siren: target.siren.value,
      name: target.name.value,
      description: target.description.value,
      url: target.url.value,
      type: target.type.value,
      country: target.country.value,
      county: target.department.value,
      city: target.city.value,
      category: categorySelected.value,
    };

    axios({
      method: "POST",
      url: `/api/business/create`,
      data,
      withCredentials: true,
    })
      .then(() => router.push(`/profile/${ownerId}`))
      .catch((err) => {
        setError({ status: true, message: err.response.data.message ?? E1 });
      });
  };

  return (
    <>
      <h2>Créer mon Business on Wheels !</h2>
      <div className="lightSeparator mt5" />
      <p className="mt5">
        Seuls les entreprises, les solo-entrepreneurs et associations peuvent
        avoir un compte "business". La validation du compte est manuelle et peut
        prendre jusqu'à 48h.
      </p>
      <ErrorLayout
        error={error.status}
        message={error.message}
        setError={setError}
      />
      <form onSubmit={onSumbit}>
        <BusinessProfileForm
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          isUpdate={false}
        />
        <div className="mt5" />
        <RegularButton type="submit" text="valider" style="full" />
      </form>
    </>
  );
};
export default AddBusinessProfile;