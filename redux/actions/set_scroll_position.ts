import { ActionCreator } from "../types/Action";

const set_scroll_position: ActionCreator = (scroll_position: number[]) => {
  return {
    type: "set_scroll_position",
    payload: scroll_position,
  };
};

export default set_scroll_position;
