import querystring from "querystring";
import PTT from "../../core/PTT";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const data = await PTT.getBoard(
    req.query?.forum as string,
    req.query?.id as string
  );
  res.status(200).json(data);
};

export default handler;
