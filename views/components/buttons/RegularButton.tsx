import { MouseEventHandler } from "react";
import styles from "../../styles/Buttons.module.scss";

interface Props {
  text: string;
  type: "button" | "submit" | "reset";
  style: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function RegularButton({ text, type, style, onClick }: Props) {
  return (
    <button
      type={type}
      className={
        style === "full"
          ? styles.fullButton
          : style === "light"
          ? styles.lightButton
          : styles.outlineButton
      }
      onClick={onClick}
    >
      <p
        className={
          style === "full"
            ? styles.fullButtonText
            : style === "light"
            ? styles.lightButtonText
            : styles.outlineButtonText
        }
      >
        {text}
      </p>
    </button>
  );
}
