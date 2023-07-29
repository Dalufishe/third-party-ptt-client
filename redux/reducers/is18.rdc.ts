import { Action } from "../types/action";

const is18 = (prevSate = false, action: Action) => {
  let newState = prevSate;
  if (action.type === "setIs18") {
    newState = action.payload;
    return newState;
  } else {
    return prevSate;
  }
};

export default is18;
