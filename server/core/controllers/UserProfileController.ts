import sharp from "sharp";
import { UserInterface } from "../entities/UserInterface";
import { SaveAvatarUseCase } from "../use-cases/User/saveAvatarUseCase";
import { uploadImage } from "../../infrastructure/middleware/imageUpload";
import { UpdateUserProfileUseCase } from "../use-cases/User/updateUserProfile";
import { validationResult } from "express-validator";

interface ResponseError extends Error {
  status?: number;
}

export class UserProfileController {
  private saveAvatarUseCase: SaveAvatarUseCase;
  private updateUserProfileUseCase: UpdateUserProfileUseCase;

  constructor(
    saveAvatarUseCase: SaveAvatarUseCase,
    updateUserProfileUseCase: UpdateUserProfileUseCase
  ) {
    this.saveAvatarUseCase = saveAvatarUseCase;
    this.updateUserProfileUseCase = updateUserProfileUseCase;
  }

  async saveAvatar(userId: number, file: any): Promise<UserInterface | any> {
    if (!process.env.S3_AVATAR_BUCKET_NAME) return null;
    try {
      const buffer = await sharp(file.buffer)
        .resize({ width: 200, height: 200 })
        .toBuffer();
      file.buffer = buffer;

      const avatar = await uploadImage(process.env.S3_AVATAR_BUCKET_NAME, file);
      if (!avatar || !avatar.Key) {
        let err = new Error(
          "Une erreur s'est produite. L'avatar n'a pas pu être sauvegardé."
        ) as ResponseError;
        err.status = 400;
        throw err;
      }
      return await this.saveAvatarUseCase.execute(userId, avatar.Key);
    } catch (error) {
      let err = new Error(
        "Une erreur s'est produite. L'avatar n'a pas pu être sauvegardé."
      ) as ResponseError;
      err.status = 400;
      throw err;
    }
  }
  async updateUserProfile(req: any, res: any, next: any): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ message: errors.array(), status: 400 });
    }
    try {
      const userIdFromRequest = parseInt(req.params.id);
      const { userId } = req.payload;

      if (!userId || !userIdFromRequest || userId !== userIdFromRequest)
        return next({ status: 400, message: "UserId is missing" });

      const userUpdated = await this.updateUserProfileUseCase.execute(
        req.body,
        userId
      );

      return userUpdated;
    } catch (err) {
      console.log(err);
      next({ status: 500, message: err });
    }
  }
}
