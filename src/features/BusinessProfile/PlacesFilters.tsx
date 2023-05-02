import React from "react";
import { useRouter } from "next/router";

import { businessCategories } from "src/constants/BusinessCategories";
import { cardColor } from "src/utils/colorManager";
import SelectDepartment from "@/components/form/Location/SelectDepartment";

interface Props {
  dept: string | null;
  categorySelected: string | null;
}

export default function PlacesFilters({ dept, categorySelected }: Props) {
  const router = useRouter();
  const onSelectDepartment = (event: any) => {
    const department = event.target.value;
    const category = categorySelected ? categorySelected : "all";
    router.push(`/business/search/${department}/${category}`);
  };

  const onSelectCategory = (categorySelected: string) => {
    const departmentSelected = dept ? dept : "all";
    router.push(`/business/search/${departmentSelected}/${categorySelected}`);
  };

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
    <>
      <SelectDepartment
        userDept={dept}
        onSelectDepartment={onSelectDepartment}
      />
      <div className="center">
        <div className="flexStart">
          {businessCategories.map((category) =>
            categoryTag(category.id, category.value, category.name)
          )}
          {categoryTag(0, "all", "X")}
        </div>
      </div>
    </>
  );
}
