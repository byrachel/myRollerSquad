import React from "react";
import departments from "../../../utils/frenchDepartments.json";

interface Props {
  userDept?: string | null;
  onSelectDepartment: (event: any) => void;
}

export default function SelectDepartment({
  userDept,
  onSelectDepartment,
}: Props) {
  return (
    <div className="deptDataList">
      <select
        name="department"
        className="datalistInput"
        defaultValue={userDept || "all"}
        placeholder="Quel est ton département ?"
        onChange={onSelectDepartment}
      >
        {!userDept || userDept === "all" ? (
          <option>Quel est ton département ?</option>
        ) : null}
        {departments.map((elt) => (
          <option key={elt.num_dep} value={elt.num_dep}>
            {elt.dep_name}
          </option>
        ))}
      </select>
    </div>
  );
}
