import { PostInterface } from "app/interfaces/flowInterfaces";

export interface FlowInterface {
  cursor: number | null;
  category: number | null;
  style: number | null;
  posts: PostInterface[];
  refetch: number;
}

const FlowReducer = (
  state: FlowInterface,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "REFETCH":
      return {
        ...state,
        refetch: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        cursor: 0,
      };
    case "SET_STYLE":
      return {
        ...state,
        style: action.payload,
        cursor: 0,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
        cursor: action.payload.cursor,
      };
    case "SET_CURSOR":
      return {
        ...state,
        cursor: action.payload,
      };
    default:
      return state;
  }
};

export default FlowReducer;
