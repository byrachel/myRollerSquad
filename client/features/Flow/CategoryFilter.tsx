import React from "react";

import { flowCategories } from "client/constants/PostCategories";

interface Props {
  flowDispatch: React.Dispatch<any>;
}

export default function CategoryFilter({ flowDispatch }: Props) {
  const onSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    flowDispatch({
      type: "SET_CATEGORY",
      payload: parseInt(e.target.value),
    });
  };

  return (
    <div className="selectFilter">
      <select name="category" onChange={onSelectCategory}>
        <option value="">Tous types de post</option>
        {flowCategories.map((elt: { id: number; name: string }) => (
          <option key={elt.id} value={elt.id}>
            {elt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
