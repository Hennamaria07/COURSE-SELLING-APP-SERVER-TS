import { Request, Express} from "express";
import multer, {Multer} from "multer";

const storage: multer.StorageEngine = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, file.originalname);
  },
});

const upload: Multer = multer({ storage: storage });

export default upload;
