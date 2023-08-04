import { ActionCreator } from "../types/Action";

const set_hot_board: ActionCreator = (data: any) => {
  return {
    type: "set_hot_board",
    payload: data,
  };
};

export default set_hot_board;
