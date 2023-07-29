import { ActionCreator } from "../types/action";

const setIs18: ActionCreator = () => {
  return {
    type: "setIs18",
    payload: true,
  };
};

export default setIs18;
