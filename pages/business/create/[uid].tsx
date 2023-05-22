import SidebarLayout from "src/components/layouts/SidebarLayout";
import AddBusinessProfile from "src/features/BusinessProfile/AddBusinessProfile";
import { useUser } from "src/hooks/useUser";
import Loader from "src/components/layouts/Loader";

const BusinessSignup = () => {
  const userId = useUser((state) => state.userId);

  return (
    <SidebarLayout
      sidebar={
        <>
          <h2>Crée ton espace "Business" et apparaît dans l'annuaire !</h2>
          <p className="meta mt5">C'est gratuit ;-)</p>
          <div className="lightSeparator mt5" />

          <p className="mt5">
            <b>Attention :</b> Seules les entreprises, les solo-entrepreneurs et
            associations peuvent avoir un espace "business".
          </p>
          <p className="mt5">
            La validation du compte est manuelle et peut prendre jusqu'à 48h.
          </p>
        </>
      }
      content={userId ? <AddBusinessProfile ownerId={userId} /> : <Loader />}
    />
  );
};
export default BusinessSignup;
