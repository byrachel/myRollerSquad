import bcrypt from "bcrypt";
import prisma from "../../prisma/db/client";
import s3 from "../../middleware/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export function newUserSignIn(user: {
  email: string;
  password: string;
  name: string;
}) {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function findUserById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function saveUserAvatar(file: any, data: any) {
  console.log("file", file);
  console.log("data", data);

  const uploadImage = async (key: any, file: any) => {
    console.log("key", key);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : "",
      Key: `resized-${file.originalname}`,
      Body: data,
      ContentType: file.mimetype,
    };

    console.log("params", params);

    const command = new PutObjectCommand(params);

    try {
      const { ETag } = await s3.send(command);
      console.log(`Successfully uploaded ${key} to S3 with ETag ${ETag}`);
      return ETag;
    } catch (error) {
      console.error(`Error uploading ${key} to S3: ${error}`);
      return null;
    }
  };

  const avatar = uploadImage(file.originalname, file);

  console.log("avatar", avatar);

  //   const { userId } = req.payload;
  //   if (!userId) return res.status(417);
  //   const user = await prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       avatar: data.Location,
  //     },
  //   });

  // return prisma.user.findUnique({
  //   where: {
  //     id,
  //   },
  // });
}
