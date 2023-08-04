import { Action } from "../types/Action";

const hot_board = (prevSate = [], action: Action) => {
  let newState = prevSate;
  if (action.type === "set_hot_board") {
    newState = action.payload;
    return newState;
  } else {
    return prevSate;
  }
};

export default hot_board;
