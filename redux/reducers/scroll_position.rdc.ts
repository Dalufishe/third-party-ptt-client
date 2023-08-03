import { Action } from "../types/Action";

const scroll_position = (
  prevSate = {
    quene:[]
  },
  action: Action
) => {
  let newState = prevSate;
  if (action.type === "set_scroll_position") {
    newState = action.payload;
    return newState;
  } else {
    return prevSate;
  }
};

export default scroll_position;
