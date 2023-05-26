import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const checkUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.id) return null;

  const { uid } = req.query;
  if (!uid) return null;

  const userId = Array.isArray(uid) ? uid[0] : uid;
  if (!userId || parseInt(userId) !== session.user.id) return null;

  return session.user;
};

export const checkUserIsConnected = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.id) return null;

  return session.user;
};

export const checkConnectedUserIsAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (
    !session ||
    !session.user ||
    !session.user.id ||
    !session.user.role ||
    session.user.role !== "ADMIN"
  )
    return null;

  return session.user;
};
