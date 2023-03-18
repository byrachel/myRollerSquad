import { Request } from "express";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: Request, file: any, callback: DestinationCallback) => {
    callback(null, "public/uploads/");
  },
  filename: (req: Request, file: any, callback: FileNameCallback) => {
    const name = file.originalname.split(" ").join("_");
    const uniqueName = Date.now() + "_" + name;
    callback(null, uniqueName);
  },
});

export default multer({ storage: storage });
