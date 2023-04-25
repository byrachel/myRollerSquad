export const authInitialState = {
  loading: false,
  error: { status: false, message: "" },
  isRegistered: false,
};

interface IAuthState {
  loading: boolean;
  error: { status: boolean; message: string };
  isRegistered: boolean;
}

export const RegisterReducer = (
  state: IAuthState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: { status: false, message: "" },
        isRegistered: false,
      };
    case "ERROR":
      return {
        loading: false,
        error: { status: true, message: action.payload },
        isRegistered: false,
      };
    case "IS_REGISTERED":
      return {
        loading: false,
        error: { status: false, message: "" },
        isRegistered: true,
      };
    case "HIDE_ERROR":
      return {
        loading: false,
        error: { status: false, message: "" },
        isRegistered: false,
      };
    default:
      return {
        ...state,
      };
  }
};
