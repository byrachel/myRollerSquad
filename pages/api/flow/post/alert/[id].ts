import { NextApiRequest, NextApiResponse } from "next";

import sendEmail from "@/server/utils/sendEmail";
import { E1 } from "views/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(401).json({ message: E1 });
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: E1 });
  const postid = Array.isArray(id) ? id[0] : id;
  try {
    const html =
      `<h2>Publication signalée : ${postid}</h2> <a href=` +
      `https://myrollersquad.vercel.app/post/${id}` +
      `>Consulter l'article</a>`;

    sendEmail(`myrollersquad@gmail.com`, `[myRollerSquad] Alerte`, html);
    res.status(200).json({ id });
  } catch (err) {
    res.status(500).json({ message: E1 });
  }
}
