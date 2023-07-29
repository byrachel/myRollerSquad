import React from "react";

import { rollerSkateStyles } from "views/constants/RollerSkateStyles";

interface Props {
  flowDispatch: React.Dispatch<any>;
}

export default function StyleFilter({ flowDispatch }: Props) {
  const onSelectStyle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    flowDispatch({
      type: "SET_STYLE",
      payload: parseInt(e.target.value),
    });
  };

  return (
    <div className="selectFilter">
      <select name="style" onChange={onSelectStyle}>
        <option value="">Tous styles</option>
        {rollerSkateStyles.map((elt: { id: number; name: string }) => (
          <option key={elt.id} value={elt.id}>
            {elt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
