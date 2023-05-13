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
        onChange={onSelectDepartment}
      >
        <option>Quel est ton département ?</option>
        {departments.map((elt) => (
          <option key={elt.num_dep} value={elt.num_dep}>
            {elt.dep_name}
          </option>
        ))}
      </select>
    </div>
  );
}
