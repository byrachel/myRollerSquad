import sharp from "sharp";
import { UserInterface } from "../entities/UserInterface";
import { SaveAvatarUseCase } from "../use-cases/User/saveAvatarUseCase";
import { uploadImage } from "../../infrastructure/middleware/imageUpload";

interface ResponseError extends Error {
  status?: number;
}

export class UserProfileController {
  private saveAvatarUseCase: SaveAvatarUseCase;

  constructor(saveAvatarUseCase: SaveAvatarUseCase) {
    this.saveAvatarUseCase = saveAvatarUseCase;
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
}
