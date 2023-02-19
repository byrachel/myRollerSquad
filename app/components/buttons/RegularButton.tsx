import styles from "../../styles/Buttons.module.scss";

interface Props {
  text: string;
  type: string;
}

export default function RegularButton({ text, type }: Props) {
  const onClick = () => {
    console.log("click");
  };
  return (
    <button
      type="button"
      className={type === "full" ? styles.fullBigButton : styles.outlineButton}
      onClick={onClick}
    >
      <p
        className={
          type === "full" ? styles.fullBigButtonText : styles.outlineButtonText
        }
      >
        {text}
      </p>
    </button>
  );
}
