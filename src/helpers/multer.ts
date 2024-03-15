import multer, { diskStorage, FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

interface MulterExtendedOptions extends multer.Options {
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => void;
}

const upload: multer.Multer = multer({
  storage: diskStorage({}),
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const extension = path.extname(file.originalname);
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.svg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
} as MulterExtendedOptions);

export default upload;
