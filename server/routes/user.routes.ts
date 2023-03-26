import express, { NextFunction, Response } from "express";
import multer from "multer";

import { UserProfileRepository } from "../infrastructure/repositories/User/UserProfileRepository";
import { SaveAvatarUseCase } from "../core/use-cases/User/saveAvatarUseCase";
import { UserProfileController } from "../core/controllers/UserProfileController";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";

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
      const updatedUser = await userProfileController.saveAvatar(
        userId,
        req.file
      );
      if (!updatedUser) {
        return next("Something went wrong : user is not updated");
      }
      return res.status(200).json({ user: updatedUser });
    } else {
      return next("Avatar file or UserId is missing");
    }
  }
);

export default userRouter;
