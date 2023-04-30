import React from "react";
import Link from "next/link";

import SelectDepartment from "../form/Location/SelectDepartment";
import { UserStateInterface } from "src/reducers/UserReducer";

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
        <p className="meta">Tu veux te référencer dans l'annuaire ?</p>

        {userState.isLoggedIn ? (
          <Link href={`/business/create/${userState.id}`}>
            <p className="textLink">
              Crée ton compte business, c'est gratuit !
            </p>
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
