import { ActionCreator } from "../types/Action";

const set_board_data: ActionCreator = (boardName: string, data: any) => {
  return {
    type: "set_board_data",
    name: boardName,
    payload: data,
  };
};

export default set_board_data;
