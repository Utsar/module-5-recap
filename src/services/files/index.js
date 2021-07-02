import express from "express";
import multer from "multer";
import { writeUsersPicture } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

// post single

filesRouter.post(
  "/upload",
  multer().single("profilePic"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      await writeUsersPicture(req.file.originalname, req.file.buffer);
      res.send("img uploaded");
    } catch (error) {
      next(error);
    }
  }
);

// post multiple

filesRouter.post(
  "/uploadMultiple",
  multer().array("profilePic"),
  async (req, res, next) => {
    try {
      const arrayOfPromises = req.files.map((file) =>
        writeUsersPicture(file.originalname, file.buffer)
      );
      await Promise.all(arrayOfPromises);
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
