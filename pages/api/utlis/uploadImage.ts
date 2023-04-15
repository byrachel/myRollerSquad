import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./aws";

export const uploadImage = async (bucket: string, file: any) => {
  const timestamp = Date.now();
  const params = {
    Bucket: bucket,
    Key: `${timestamp}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    const { ETag } = await s3.send(command);
    return { ETag, Key: params.Key };
  } catch (error) {
    console.error(`Error uploading ${file.originalname} to S3: ${error}`);
    return null;
  }
};
