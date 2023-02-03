import styles from "../../styles/Buttons.module.scss";

interface Props {
    text: string;
}

export default function OutlineButton({text}: Props) {

    const onClick = () => {
        console.log('click')
    }
  return (
    <button type="button" className={styles.outlineButton} onClick={onClick}>
        <p className={styles.outlineButtonText}>
            {text}
        </p>
    </button>
  )
}
