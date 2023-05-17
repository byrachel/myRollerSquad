import InputText from "@/components/form/InputText";
import InputUrl from "@/components/form/InputUrl";
import SelectLocation from "@/components/form/Location/SelectLocation";
import { Radio } from "@nextui-org/react";
import { businessCategories } from "src/constants/BusinessCategories";
import { PlaceInterface } from "src/interfaces/userInterfaces";

interface Props {
  placeToUpdate?: PlaceInterface;
  categorySelected: { id: number; value: string; name: string };
  setCategorySelected: (args: {
    id: number;
    value: string;
    name: string;
  }) => void;
  isUpdate?: boolean;
}

const BusinessProfileForm = ({
  placeToUpdate,
  categorySelected,
  setCategorySelected,
  isUpdate,
}: Props) => {
  return (
    <>
      {isUpdate ? (
        placeToUpdate && (
          <p className="meta mt5">
            {placeToUpdate.type} - {placeToUpdate.siren}
          </p>
        )
      ) : (
        <>
          <div className="flexStart mt5">
            <Radio.Group
              orientation="horizontal"
              defaultValue="PROFESSIONAL"
              aria-label="Indique si tu es une entreprise ou une association"
            >
              <Radio value="PROFESSIONAL" color="secondary" size="sm">
                Entreprise
              </Radio>
              <Radio value="ASSOCIATION" color="secondary" size="sm">
                Association
              </Radio>
            </Radio.Group>
          </div>
          <InputText
            label="Numéro de SIREN (ou RNA pou les associations)"
            placeholder="SIREN (ou RNA)"
            name="siren"
            required
            minLength={9}
            maxLength={10}
          />
        </>
      )}
      <InputText
        placeholder="Nom de ton entreprise / association"
        name="name"
        required
        value={placeToUpdate ? placeToUpdate.name : ""}
      />
      <textarea
        placeholder="Tes services, tes valeurs..."
        className="input"
        name="description"
        required={false}
        rows={4}
        defaultValue={placeToUpdate ? placeToUpdate.description : ""}
      />

      <label htmlFor="category">Catégorie :</label>
      <div className="flexStart">
        {businessCategories.map((category) => (
          <div
            role="button"
            id="category"
            key={category.id}
            tabIndex={0}
            className={
              category.id === categorySelected.id
                ? `badge blue`
                : "outlineBadge grey"
            }
            onClick={() => setCategorySelected(category)}
            onKeyDown={() => setCategorySelected(category)}
          >
            {category.name}
          </div>
        ))}
      </div>

      <SelectLocation
        country={placeToUpdate ? placeToUpdate.country : "France"}
        department={placeToUpdate ? placeToUpdate.county : null}
        city={placeToUpdate ? placeToUpdate.city : null}
      />

      <InputUrl
        value={placeToUpdate ? placeToUpdate.website : ""}
        required={true}
      />
    </>
  );
};
export default BusinessProfileForm;
