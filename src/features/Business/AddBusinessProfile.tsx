import { useRouter } from "next/router";
import { useReducer } from "react";
import axios from "axios";

import RegularButton from "src/components/buttons/RegularButton";
import ErrorLayout from "src/components/layouts/ErrorLayout";
import BusinessProfileForm from "./BusinessProfileForm";
import { E1, E3 } from "src/constants/ErrorMessages";
import { businessCategories } from "src/constants/BusinessCategories";
import { useProfile } from "src/hooks/useProfile";
import { BusinessReducer } from "src/reducers/BusinessReducer";

interface Props {
  ownerId: number;
}

const AddBusinessProfile = ({ ownerId }: Props) => {
  const router = useRouter();
  // const [error, setError] = useState({ status: false, message: "" });
  // const [categorySelected, setCategorySelected] = useState(
  //   businessCategories[0]
  // );

  const initialState = {
    description: "",
    category: businessCategories[0],
    error: { status: false, message: "" },
  };

  const [businessState, dispatchBusinessState] = useReducer(
    BusinessReducer,
    initialState
  );

  const { addUserPlace } = useProfile((state) => ({
    addUserPlace: state.addUserPlace,
  }));

  console.log("businessState", businessState);

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setError({ status: false, message: "" });

    dispatchBusinessState({ type: "HIDE_ERROR", payload: {} });

    const target = event.target as typeof event.target & {
      siren: { value: string };
      name: { value: string };
      url: { value: string };
      type: { value: string };
      country: { value: string };
      department: { value?: string };
    };

    if (
      !target.siren.value ||
      !target.name.value ||
      !target.type.value ||
      !target.url.value
    )
      // return setError({ status: true, message: E3 });
      return dispatchBusinessState({
        type: "ERROR",
        payload: { status: true, message: E3 },
      });

    const data = {
      siren: target.siren.value,
      name: target.name.value,
      description: businessState.description,
      url: target.url.value,
      type: target.type.value,
      country: target.country.value,
      county: target.department.value,
      category: businessState.category.value,
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
        dispatchBusinessState({
          type: "ERROR",
          payload: {
            status: true,
            message: err.response.data.message ?? E1,
          },
        });

        // setError({ status: true, message: err.response.data.message ?? E1 });
      });
  };

  return (
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
          isUpdate={false}
        />
        <div className="mt5" />
        <RegularButton type="submit" text="valider" style="outline" />
      </form>
    </>
  );
};
export default AddBusinessProfile;
