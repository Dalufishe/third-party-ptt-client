import { Action } from "../types/Action";

type BoardDataAction = Action & { name: string };

const board_data = (prevSate: any = {}, action: BoardDataAction) => {
  let newState = { ...prevSate };
  if (action.type === "set_board_data") {
    newState[action.name] = action.payload;
    return newState;
  } else {
    return prevSate;
  }
};

export default board_data;
