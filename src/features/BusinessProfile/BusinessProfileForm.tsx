import InputText from "@/components/form/InputText";
import InputUrl from "@/components/form/InputUrl";
import SelectLocation from "@/components/form/Location/SelectLocation";
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
            <div className="flexStart mr5">
              <input
                type="radio"
                id="association"
                name="type"
                style={{ marginRight: 10, marginTop: 18 }}
                value="ASSOCIATION"
                checked
              />
              <label htmlFor="association">Association</label>
            </div>
            <div className="flexStart">
              <input
                type="radio"
                id="business"
                name="type"
                style={{ marginRight: 10, marginTop: 18 }}
                value="PROFESSIONAL"
              />
              <label htmlFor="business">Entreprise</label>
            </div>
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
        placeholder="Nom de ton business on wheels !"
        name="name"
        required
        value={placeToUpdate ? placeToUpdate.name : ""}
      />
      <textarea
        placeholder="Decris ton activité, tes valeurs..."
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
