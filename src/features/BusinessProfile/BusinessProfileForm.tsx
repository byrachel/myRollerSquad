import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import InputText from "@/components/form/InputText";
import InputUrl from "@/components/form/InputUrl";
import RegularButton from "@/components/buttons/RegularButton";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import SelectLocation from "@/components/form/Location/SelectLocation";

interface Props {
  ownerId: number;
}

const BusinessProfileForm = ({ ownerId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState({ status: false, message: "" });

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

    const data = {
      siren: target.siren.value,
      name: target.name.value,
      description: target.description.value,
      url: target.url.value,
      type: target.type.value,
      country: target.country.value,
      department: target.department.value,
      city: target.city.value,
    };

    axios
      .post("/api/business/create", data)
      .then(() => router.push(`/profile/${ownerId}`))
      .catch((err) => {
        setError({ status: true, message: err.response.data.message });
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
        <div className="flexStart mt5">
          <div className="flexStart mr5">
            <input
              type="radio"
              id="association"
              name="type"
              style={{ marginRight: 10, marginTop: 18 }}
              value="ASSOCIATION"
            />
            <label htmlFor="association">Association</label>
          </div>
          <div className="flexStart">
            <input
              type="radio"
              id="business"
              name="type"
              style={{ marginRight: 10, marginTop: 18 }}
              value="BUSINESS"
            />
            <label htmlFor="business">Entreprise</label>
          </div>
        </div>
        <InputText
          label="Numéro de SIREN (ou RNA pou les associations)"
          placeholder=""
          name="siren"
          required
          minLength={9}
          maxLength={10}
        />
        <InputText
          label="Nom de l'asso ou entreprise"
          placeholder="Nom"
          name="name"
          required
        />
        <InputText
          label="Description"
          placeholder="Description"
          name="description"
          required={false}
        />

        <SelectLocation country={"France"} department={null} city={null} />

        <InputUrl required={false} />
        <div className="mt5" />
        <RegularButton type="submit" text="valider" style="full" />
      </form>
    </>
  );
};
export default BusinessProfileForm;
