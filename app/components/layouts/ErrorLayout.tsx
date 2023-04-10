interface Props {
  error: boolean;
  message: string;
  setError?: (error: { status: boolean; message: string }) => void;
  dispatchError?: React.Dispatch<any>;
}

export default function ErrorLayout({
  error,
  message,
  setError,
  dispatchError,
}: Props) {
  const hideErrorMessage = () => {
    if (setError) {
      setError({ status: false, message: "" });
    } else if (dispatchError) {
      dispatchError({ type: "HIDE_ERROR" });
    } else {
      return;
    }
  };
  return error ? (
    <div className="errorBox">
      <p className="errorMessage">{message}</p>
      <div
        role="button"
        tabIndex={0}
        className="closeErrorBox"
        onClick={hideErrorMessage}
        onKeyDown={hideErrorMessage}
      >
        X
      </div>
    </div>
  ) : null;
}
