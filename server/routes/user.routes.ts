import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import db from "../infrastructure/prisma/db/client";
import { check, validationResult } from "express-validator";

import { UserProfileRepository } from "../infrastructure/repositories/User/UserProfileRepository";
import { SaveAvatarUseCase } from "../core/use-cases/User/saveAvatarUseCase";
import { UserProfileController } from "../core/controllers/UserProfileController";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
import { findUserById } from "../infrastructure/repositories/User/UserRepository";
import { UpdateUserProfileUseCase } from "../core/use-cases/User/updateUserProfile";

const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const userProfileRepository = new UserProfileRepository();
const saveAvatarUseCase = new SaveAvatarUseCase(userProfileRepository);
const updateUserProfileUseCase = new UpdateUserProfileUseCase(
  userProfileRepository
);
const userProfileController = new UserProfileController(
  saveAvatarUseCase,
  updateUserProfileUseCase
);

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
  [
    check("name").not().isEmpty().trim().isLength({ min: 3, max: 20 }),
    check("resume").trim(),
    check("social_medias.instagram").trim(),
    check("social_medias.tiktok").trim(),
    check("social_medias.youtube").trim(),
    check("roller_dance_level").isLength({ max: 1 }).isNumeric(),
    check("skatepark_level").isLength({ max: 1 }).isNumeric(),
    check("urban_level").isLength({ max: 1 }).isNumeric(),
    check("freestyle_level").isLength({ max: 1 }).isNumeric(),
    check("derby_level").isLength({ max: 1 }).isNumeric(),
    check("artistic_level").isLength({ max: 1 }).isNumeric(),
    check("country").not().isEmpty().trim(),
    check("city").trim(),
  ],
  isAuthenticated,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await userProfileController.updateUserProfile(
        req,
        res,
        next
      );
      if (!updatedUser)
        return next({ status: 400, message: "Updated impossible" });
      return res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.log("UPDATE USER ERROR", error);
      return next({ status: 400, message: error });
    }
  }
);

export default userRouter;
