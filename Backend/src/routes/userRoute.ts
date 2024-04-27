import express from "express";
import {
  registerUser,
  loginController,
  updateProfile,
  auth,
} from "../controller/userController";
import upload from "../middleware/multer";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/auth",authenticateUser, auth);
router.post("/signup", registerUser);
router.post("/login", loginController);
router.put("/updateProfile", upload.single('image'), updateProfile);
export default router;
