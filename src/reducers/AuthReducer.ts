export const authInitialState = {
  loading: false,
  error: { status: false, message: "" },
  isregistred: false,
};

export const RegisterReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: { status: false, message: "" },
        isregistred: false,
      };
    case "ERROR":
      return {
        loading: false,
        error: { status: true, message: action.payload },
        isregistred: false,
      };
    case "IS_REGISTERED":
      return {
        loading: false,
        error: { status: false, message: "" },
        isregistred: true,
      };
    case "HIDE_ERROR":
      return {
        loading: false,
        error: { status: false, message: "" },
        isregistred: false,
      };
    default:
      return {
        ...state,
      };
  }
};
