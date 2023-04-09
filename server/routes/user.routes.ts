import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import db from "../infrastructure/prisma/db/client";

import { UserProfileRepository } from "../infrastructure/repositories/User/UserProfileRepository";
import { SaveAvatarUseCase } from "../core/use-cases/User/saveAvatarUseCase";
import { UserProfileController } from "../core/controllers/UserProfileController";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
import { findUserById } from "../infrastructure/repositories/User/UserRepository";

const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const userProfileRepository = new UserProfileRepository();
const saveAvatarUseCase = new SaveAvatarUseCase(userProfileRepository);
const userProfileController = new UserProfileController(saveAvatarUseCase);

userRouter.post(
  "/api/avatar",
  isAuthenticated,
  upload.single("avatar"),
  async (req: any, res: Response, next: NextFunction) => {
    const { userId } = req.payload;
    if (req.file && userId) {
      try {
        const updatedUser = await userProfileController.saveAvatar(
          userId,
          req.file
        );
        return res.status(200).json({ user: updatedUser });
      } catch (error) {
        console.log("ERROR", error);
        return next(error);
      }
    } else {
      return next("Avatar file or UserId is missing");
    }
  }
);

userRouter.get(
  "/api/:id/userprofile",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      console.log(id);
      if (!id) return next("UserId is missing");
      const userDetails = await findUserById(id);
      console.log(">>>", userDetails);
      if (!userDetails) return next("User not found");
      return res.status(200).json({ user: userDetails });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.put(
  "/api/userprofile/update/:id",
  isAuthenticated,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const userIdFromRequest = parseInt(req.params.id);
      const { userId } = req.payload;

      if (!userId || !userIdFromRequest || userId !== userIdFromRequest)
        return next("UserId is missing");
      const data = req.body;
      console.log(data);
      const user = await db.user.update({
        where: {
          id: userId,
        },
        data,
      });

      return res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }
);

export default userRouter;
