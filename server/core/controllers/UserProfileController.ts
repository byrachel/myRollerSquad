import sharp from "sharp";
import { UserInterface } from "../entities/UserInterface";
import { SaveAvatarUseCase } from "../use-cases/User/saveAvatarUseCase";
import { uploadImage } from "../../infrastructure/middleware/imageUpload";

export class UserProfileController {
  private saveAvatarUseCase: SaveAvatarUseCase;

  constructor(saveAvatarUseCase: SaveAvatarUseCase) {
    this.saveAvatarUseCase = saveAvatarUseCase;
  }

  async saveAvatar(userId: number, file: any): Promise<UserInterface | null> {
    try {
      const buffer = await sharp(file.buffer)
        .resize({ width: 200, height: 200 })
        .toBuffer();

      if (!process.env.S3_AVATAR_BUCKET_NAME) return null;

      const avatar = await uploadImage(
        process.env.S3_AVATAR_BUCKET_NAME,
        file,
        buffer
      );

      if (!avatar || !avatar.Key) {
        return null;
      }
      return await this.saveAvatarUseCase.execute(userId, avatar.Key);
    } catch (error) {
      return null;
    }
  }
}
