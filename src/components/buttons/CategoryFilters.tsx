import React from "react";

import { businessCategories } from "src/constants/BusinessCategories";
import { cardColor } from "src/utils/colorManager";

interface Props {
  onSelectCategory: (arg: string) => void;
  categorySelected: string | null;
}

export default function CategoryFilters({
  onSelectCategory,
  categorySelected,
}: Props) {
  const categoryTag = (id: number, value: string, name: string) => (
    <div
      role="button"
      id="category"
      key={id}
      tabIndex={0}
      className={
        value === categorySelected
          ? `badge ${cardColor(id)}`
          : `outlineBadge ${cardColor(id)}`
      }
      onClick={() => onSelectCategory(value)}
      onKeyDown={() => onSelectCategory(value)}
    >
      {name}
    </div>
  );

  return (
    <div className="center">
      <div className="flexStart">
        {businessCategories.map((category) =>
          categoryTag(category.id, category.value, category.name)
        )}
        {categoryTag(0, "all", "X")}
      </div>
    </div>
  );
}
