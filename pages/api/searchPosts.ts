import PTT, { Board } from "../../core/PTT";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: Board = await PTT.searchPosts(
    req.query?.boardName as string,
    req.query?.keyword as string,
    req.query?.page as string
  );
  res.status(200).json(data);
};

export default handler;
