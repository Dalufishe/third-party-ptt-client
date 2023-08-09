import PTT from "../../core/PTT";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await PTT.getHotBoards();
  res.status(200).json(data);
};

export default handler;
