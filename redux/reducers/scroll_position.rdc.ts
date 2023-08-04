import { Action } from "../types/Action";

type State = { queue: number[] };

const scroll_position = (
  prevSate: State = {
    queue: [],
  },
  action: Action
) => {
  let newState = { ...prevSate };
  if (action.type === "set_scroll_position") {
    newState.queue = [...action.payload];
    return newState;
  } else {
    return prevSate;
  }
};

export default scroll_position;
