import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import SelectDepartment from "@/components/form/Location/SelectDepartment";
import { useContext } from "react";
import { UserContext } from "src/context/UserContext";
import { useRouter } from "next/router";

export default function FindACoach() {
  const { userState, userDispatch } = useContext(UserContext);
  const userDept = userState.isLoggedIn ? userState.county : null;
  const router = useRouter();

  const onSelectDepartment = (event: any) => {
    const department = event.target.value;
    userDispatch({ type: "SELECT_DEPT", payload: department });
    router.push(`/places`);
  };

  return (
    <div className={styles.blueBox}>
      <h2 className={styles.blueBoxTitle}>
        Envie de te lancer, de dépasser tes limites ?
      </h2>
      <div className={styles.underliner} />
      <p className={styles.blueBoxText}>
        Découvre les cours & formateurs de ta région et passe au niveau
        supérieur !
      </p>

      <SelectDepartment
        userDept={userDept}
        onSelectDepartment={onSelectDepartment}
      />

      <div className={styles.imagesBox}>
        <div className={styles.fourRoundImages}>
          <div className={styles.roundImage}>
            <Image
              src="/img/pexels-rodnae-productions-7335311.jpg"
              alt="Formateur Roller Quad"
              className={styles.image}
              width={512}
              height={768}
            />
          </div>
          <div className={styles.roundImage}>
            <Image
              src="/img/pexels-airam-datoon-11990101.jpg"
              alt="Formateur Roller Quad"
              className={styles.image}
              width={614}
              height={768}
            />
          </div>
          <div className={styles.roundImage}>
            <Image
              src="/img/pexels-airam-datoon-11990083.jpg"
              alt="Formateur Roller Quad"
              className={styles.image}
              width={512}
              height={768}
            />
          </div>
          <div className={styles.roundImage}>
            <Image
              src="/img/pexels-katya-wolf-8734228.jpg"
              alt="Formateur Roller Quad"
              className={styles.image}
              width={512}
              height={768}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
