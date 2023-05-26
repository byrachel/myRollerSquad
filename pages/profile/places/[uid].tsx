import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Loader from "src/components/layouts/Loader";
import BusinessProfileCTA from "src/features/Business/BusinessProfileCTA";
import { PlaceInterface } from "src/entities/business.entity";
import { useProfile } from "src/hooks/useProfile";
import RegularButton from "@/components/buttons/RegularButton";
import MyBusinessPlace from "src/features/Business/MyBusinessPlace";

const MyPlaces = () => {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;
  const router = useRouter();

  const {
    userProfileLoading,
    userPlaces,
    getUserPlaces,
    updateUserPlace,
    deleteUserPlace,
  } = useProfile(
    (state) => ({
      userProfileLoading: state.userProfileLoading,
      userPlaces: state.userPlaces,
      getUserPlaces: state.getUserPlaces,
      updateUserPlace: state.updateUserPlace,
      deleteUserPlace: state.deleteUserPlace,
    }),
    shallow
  );

  useEffect(() => {
    if (userId && !userPlaces) {
      getUserPlaces(userId);
    }
    // eslint-disable-next-line
  }, [userId, userPlaces]);

  return (
    <>
      <div className="coloredSeparator" />
      <div className="center">
        <p className="meta center mt-large">Mon espace business</p>
        <RegularButton
          style="full"
          type="button"
          text="Créer un nouvel espace"
          onClick={() => router.push(`/business/create/${userId}`)}
        />
      </div>

      {!userId || userProfileLoading ? (
        <Loader text="ça charge... ça charge..." />
      ) : userPlaces && userPlaces.length > 0 ? (
        <>
          {userPlaces.map((place: PlaceInterface) => (
            <MyBusinessPlace
              key={place.id}
              place={place}
              userId={userId}
              updateUserPlace={updateUserPlace}
              deleteUserPlace={deleteUserPlace}
            />
          ))}
        </>
      ) : (
        <BusinessProfileCTA />
      )}
    </>
  );
};
export default MyPlaces;
