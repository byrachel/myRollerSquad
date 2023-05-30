import { useSession } from "next-auth/react";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import AddBusinessProfile from "src/features/Business/AddBusinessProfile";
import UnloggedUser from "@/components/layouts/UnloggedUser";

const BusinessSignup = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return (
    <SidebarLayout
      sidebar={
        <div className="sidebarText">
          <h1>Crée ton espace "Business" et apparaît dans l'annuaire !</h1>
          <p className="meta mt5">C'est gratuit ;-)</p>
          <div className="lightSeparator mt5" />

          <p className="mt5">
            <b>Attention :</b> Seules les entreprises, les solo-entrepreneurs et
            associations peuvent avoir un espace "business".
          </p>
          <p className="mt5">
            La validation du compte est manuelle et peut prendre jusqu'à 48h.
          </p>
        </div>
      }
      content={
        userId ? <AddBusinessProfile ownerId={userId} /> : <UnloggedUser />
      }
    />
  );
};
export default BusinessSignup;
