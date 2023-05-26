import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import RegularButton from "src/components/buttons/RegularButton";
import ErrorLayout from "src/components/layouts/ErrorLayout";
import BusinessProfileForm from "./BusinessProfileForm";
import { E1, E3 } from "src/constants/ErrorMessages";
import { businessCategories } from "src/constants/BusinessCategories";
import { useProfile } from "src/hooks/useProfile";

interface Props {
  ownerId: number;
}

const AddBusinessProfile = ({ ownerId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });
  const [categorySelected, setCategorySelected] = useState(
    businessCategories[0]
  );

  const { addUserPlace } = useProfile((state) => ({
    addUserPlace: state.addUserPlace,
  }));

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ status: false, message: "" });

    const target = event.target as typeof event.target & {
      siren: { value: string };
      name: { value: string };
      description: { value?: string };
      url: { value: string };
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
      .then((res) => {
        addUserPlace(res.data.place);
        router.push(`/profile/places/${ownerId}`);
      })
      .catch((err) => {
        setError({ status: true, message: err.response.data.message ?? E1 });
      });
  };

  return (
    <>
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
        <RegularButton type="submit" text="valider" style="outline" />
      </form>
    </>
  );
};
export default AddBusinessProfile;
