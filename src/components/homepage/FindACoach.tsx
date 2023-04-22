import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import departments from "../../utils/frenchDepartments.json";

export default function FindACoach() {
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
      <form>
        <select name="city">
          {departments.map(elt => (
            <option key={elt.dep_name} value={elt.dep_name}>
              {elt.dep_name}
            </option>
          ))}
        </select>
        <button type="submit" />
      </form>
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
