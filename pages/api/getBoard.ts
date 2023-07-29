import PTT, { Board } from "../../core/PTT";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: Board = await PTT.getBoard(
    req.query?.name as string,
    req.query?.id as string
  );
  res.status(200).json(data);
};

export default handler;
