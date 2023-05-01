import React from "react";
import Link from "next/link";

import SelectDepartment from "../form/Location/SelectDepartment";
import { UserStateInterface } from "src/reducers/UserReducer";
import RegularButton from "../buttons/RegularButton";

interface Props {
  userState: UserStateInterface;
  userDispatch: React.Dispatch<any>;
}

export default function PlacesSidebar({ userState, userDispatch }: Props) {
  const userDept = userState.county ? userState.county : null;

  const onSelectDepartment = (event: any) => {
    const department = event.target.value;
    userDispatch({ type: "SELECT_DEPT", payload: department });
  };

  return (
    <aside>
      <h2>Découvre les clubs, associations & moniteurs de ta région !</h2>
      <SelectDepartment
        userDept={userDept}
        onSelectDepartment={onSelectDepartment}
      />

      <div className="mt-large">
        <h3>Toi aussi, tu veux être référencé dans l'annuaire ?</h3>
        <p className="meta mt5">Crée ton compte, c'est gratuit !</p>

        {userState.isLoggedIn ? (
          <Link href={`/business/create/${userState.id}`}>
            <RegularButton type="button" style="outline" text="Me référencer" />
          </Link>
        ) : (
          <Link href="/signin">
            <p className="textLink">Crée un compte, c'est gratuit !</p>
          </Link>
        )}
      </div>
    </aside>
  );
}
