import { useRouter } from "next/router";
import Image from "next/image";
import SelectDepartment from "@/components/form/Location/SelectDepartment";
import styles from "../../styles/Home.module.scss";

export default function FindACoach() {
  const router = useRouter();

  const onSelectDepartment = (event: any) => {
    const department = event.target.value;
    router.push(`/business/search/${department}/all`);
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

      <SelectDepartment onSelectDepartment={onSelectDepartment} />

      <div className={styles.imagesBox}>
        <div className={styles.fourRoundImages}>
          <div className={styles.roundImage}>
            <Image
              src="/img/pexels-rodnae-productions-7335311.jpg"
              alt="Formateur Roller Quad"
              className={styles.greenImage}
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
              className={styles.yellowImage}
              width={512}
              height={768}
            />
          </div>
          <div className={styles.roundImage}>
            <Image
              src="/img/pexels-katya-wolf-8734228.jpg"
              alt="Formateur Roller Quad"
              className={styles.blueImage}
              width={512}
              height={768}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
