import { useRouter } from "next/router";

import Login from "src/features/auth/Login";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import AddBusinessProfile from "src/features/BusinessProfile/AddBusinessProfile";

const BusinessSignup = () => {
  const router = useRouter();
  const { uid } = router.query;
  const ownerId = typeof uid === "string" ? parseInt(uid) : null;

  return ownerId ? (
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
      content={<AddBusinessProfile ownerId={ownerId} />}
    />
  ) : (
    <Login />
  );
};
export default BusinessSignup;
