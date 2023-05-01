import SelectDepartment from "@/components/form/Location/SelectDepartment";
import React from "react";
import { businessCategories } from "src/constants/BusinessCategories";
import { cardColor } from "src/utils/colorManager";

interface Props {
  userDept: string | null;
  businessCategory: string | null;
  userDispatch: React.Dispatch<any>;
}

export default function PlacesFilters({
  userDept,
  businessCategory,
  userDispatch,
}: Props) {
  const onSelectDepartment = (event: any) => {
    const department = event.target.value;
    userDispatch({ type: "SELECT_DEPT", payload: department });
  };

  const onSelectCategory = (category: string) => {
    userDispatch({ type: "SELECT_BUSINESS_CATEGORY", payload: category });
  };

  return (
    <>
      <SelectDepartment
        userDept={userDept}
        onSelectDepartment={onSelectDepartment}
      />
      <div className="center">
        <div className="flexStart">
          {businessCategories.map((category) => (
            <div
              role="button"
              id="category"
              key={category.id}
              tabIndex={0}
              className={
                category.value === businessCategory
                  ? `badge ${cardColor(category.id)}`
                  : `outlineBadge ${cardColor(category.id)}`
              }
              onClick={() => onSelectCategory(category.value)}
              onKeyDown={() => onSelectCategory(category.value)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
