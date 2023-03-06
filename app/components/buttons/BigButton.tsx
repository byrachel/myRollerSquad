import { MouseEventHandler } from "react";
import styles from "../../styles/Buttons.module.scss";

interface Props {
  text: string;
  type: "button" | "submit" | "reset";
  style: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BigButton({ text, type, style, onClick }: Props) {
  return (
    <button
      type={type}
      className={
        style === "full" ? styles.fullBigButton : styles.outlineBigButton
      }
      onClick={onClick}
    >
      <p
        className={
          style === "full"
            ? styles.fullBigButtonText
            : styles.outlineBigButtonText
        }
      >
        {text}
      </p>
    </button>
  );
}
