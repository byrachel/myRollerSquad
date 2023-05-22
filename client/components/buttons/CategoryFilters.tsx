import React from "react";

import { businessCategories } from "client/constants/BusinessCategories";

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
          ? categorySelected === "all"
            ? "badge grey"
            : "badge pink"
          : "outlineBadge grey"
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
