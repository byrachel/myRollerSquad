interface Props {
  error: boolean;
  message: string;
  setError: (error: { status: boolean; message: string }) => void;
}

export default function ErrorLayout({ error, message, setError }: Props) {
  return error ? (
    <div className="errorBox">
      <p className="errorMessage">{message}</p>
      <p
        className="closeErrorBox"
        onClick={() => setError({ status: false, message: "" })}
      >
        X
      </p>
    </div>
  ) : null;
}
