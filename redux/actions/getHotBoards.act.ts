import PTT from "../../core/PTT";

const getHotBoards = async (dispatch: any) => {
  const payload = await PTT.getHotBoards();
  dispatch({
    type: "getHotBoards",
    payload,
  });
};

export {getHotBoards}
