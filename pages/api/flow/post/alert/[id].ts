import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import sendEmail from "@/server/utils/sendEmail";
import { E3 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: E3 });
    const postid = Array.isArray(id) ? id[0] : id;
    try {
      const html =
        `<h2>Publication signalée : ${postid}</h2> <a href=` +
        `https://myrollersquad.vercel.app/post/${id}` +
        `>Consulter l'article</a>`;

      sendEmail(`myrollersquad@gmail.com`, `[myRollerSquad] Alerte`, html);
      res.status(200).json({ id });
    } catch (err) {
      res.status(500).json({ message: E3 });
    }
  }
);
