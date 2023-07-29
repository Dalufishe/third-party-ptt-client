import { HotBoard } from "../../core/PTT";

const setHotBoards = (prevState: HotBoard[] = [], action: any) => {
  let newState;
  {
    if (action.type === "getHotBoards") {
      newState = action.payload;
      return newState;
    } else {
      return prevState;
    }
  }
};

export { setHotBoards };
