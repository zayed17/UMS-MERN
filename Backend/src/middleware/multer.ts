import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, '/home/zayed/Documents/UMS MERN/Frontend/src/assets');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null,file.originalname); 
  }
});

const upload = multer({ storage: storage });

export  default  upload;
