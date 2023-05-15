import React from "react";
import { useRouter } from "next/router";

import SelectDepartment from "@/components/form/Location/SelectDepartment";
import CategoryFilters from "@/components/buttons/CategoryFilters";

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

  return (
    <div className="pv5">
      <SelectDepartment
        userDept={dept}
        onSelectDepartment={onSelectDepartment}
      />
      <CategoryFilters
        onSelectCategory={onSelectCategory}
        categorySelected={categorySelected}
      />
    </div>
  );
}
