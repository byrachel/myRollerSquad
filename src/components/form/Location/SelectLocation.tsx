import React, { useState } from "react";
import countries from "src/utils/countries.json";
import departments from "src/utils/frenchDepartments.json";
import frenchCities from "src/utils/frenchCities.json";

interface Props {
  country: string | null;
  department: string | null;
  city: string | null;
}

export default function SelectLocation({ country, department, city }: Props) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    department ? department : ""
  );
  const [citiesToSelect, setCitiesToSelect] =
    useState<{ department_code: string; name: string; id: number }[]>(
      frenchCities
    );

  const handleDepartment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    const frenchCitiesFromThisDpt = frenchCities.filter(
      (city) => city.department_code === e.target.value
    );
    setCitiesToSelect(frenchCitiesFromThisDpt);
  };

  return (
    <>
      <label htmlFor="country">Pays :</label>
      <div className="select">
        <select
          id="standard-select"
          name="country"
          defaultValue={country || "France"}
        >
          {countries.map((elt) => (
            <option key={elt.name} value={elt.name}>
              {elt.name}
            </option>
          ))}
        </select>
      </div>
      {country === "France" ? (
        <div className="spaceBetween">
          <div style={{ width: "49%" }}>
            <label htmlFor="department">Département :</label>
            <div className="select">
              <select
                id="standard-select"
                name="department"
                defaultValue={selectedDepartment || ""}
                onChange={handleDepartment}
              >
                <option value="">-- Choisis ta département</option>
                {departments.map((elt) => (
                  <option key={elt.dep_name} value={elt.num_dep}>
                    {elt.dep_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ width: "49%" }}>
            <label htmlFor="city">Ville :</label>
            <div className="select">
              <select
                id="standard-select"
                name="city"
                defaultValue={city || ""}
                placeholder="-- Choisis ta ville"
              >
                <option value="">-- Choisis ta ville</option>
                {citiesToSelect.map((elt) => (
                  <option key={elt.id} value={elt.name}>
                    {elt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
