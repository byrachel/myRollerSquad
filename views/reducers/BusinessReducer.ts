export const BusinessReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SAVE_CONTENT":
      return {
        ...state,
        description: action.payload,
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "HIDE_ERROR":
      return {
        ...state,
        error: { status: false, message: "" },
      };
    default:
      return state;
  }
};
