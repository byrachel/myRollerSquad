import InputText from "views/components/form/InputText";
import InputUrl from "views/components/form/InputUrl";
import SelectLocation from "views/components/form/Location/SelectLocation";
import { Radio } from "@nextui-org/react";
import { businessCategories } from "views/constants/BusinessCategories";
import { PlaceInterface } from "models/entities/business.entity";
import Editor from "@/components/form/Editor/Editor";

interface Props {
  placeToUpdate?: PlaceInterface;
  // categorySelected: { id: number; value: string; name: string };
  // setCategorySelected: (args: {
  //   id: number;
  //   value: string;
  //   name: string;
  // }) => void;
  isUpdate?: boolean;

  businessState: any;
  dispatchBusinessState: React.Dispatch<any>;
}

const BusinessProfileForm = ({
  placeToUpdate,
  // categorySelected,
  // setCategorySelected,
  isUpdate,
  dispatchBusinessState,
  businessState,
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
              name="type"
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
      {/* <textarea
        placeholder="Tes services, tes valeurs..."
        className="input"
        name="description"
        required={false}
        rows={4}
        defaultValue={
          placeToUpdate && placeToUpdate.description
            ? placeToUpdate.description
            : ""
        }
      /> */}

      <Editor
        content={businessState.description}
        dispatchContent={dispatchBusinessState}
        placeholder="Quoi de beau à partager aujourd'hui ?"
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
              category.id === businessState.category.id
                ? `badge blue`
                : "outlineBadge grey"
            }
            onClick={() =>
              dispatchBusinessState({
                type: "UPDATE_CATEGORY",
                payload: category,
              })
            }
            onKeyDown={() =>
              dispatchBusinessState({
                type: "UPDATE_CATEGORY",
                payload: category,
              })
            }
          >
            {category.name}
          </div>
        ))}
      </div>

      <SelectLocation
        country={placeToUpdate ? placeToUpdate.country : "France"}
        department={placeToUpdate ? placeToUpdate.county : null}
      />

      <InputUrl
        value={
          placeToUpdate && placeToUpdate.website ? placeToUpdate.website : ""
        }
        required={true}
      />
    </>
  );
};
export default BusinessProfileForm;
