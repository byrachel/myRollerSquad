import React, { useState } from "react";
import countries from "app/utils/countries.json";
import departments from "app/utils/frenchDepartments.json";

interface Props {
  country: string;
  city: string | null;
}

export default function UpdateUserCountry({ country, city }: Props) {
  const [selectedCountry, setSelectedCountry] = useState(country);
  return (
    <>
      <label htmlFor="country">Pays :</label>
      <div className="select">
        <select
          id="standard-select"
          name="country"
          onChange={e => setSelectedCountry(e.target.value)}
          defaultValue={country}
        >
          {countries.map(elt => (
            <option key={elt.name} value={elt.name}>
              {elt.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry === "France" ? (
        <>
          <label htmlFor="city">Département :</label>
          <div className="select">
            <select id="standard-select" name="city" defaultValue={city || ""}>
              {departments.map(elt => (
                <option key={elt.dep_name} value={elt.dep_name}>
                  {elt.dep_name}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : null}
    </>
  );
}
