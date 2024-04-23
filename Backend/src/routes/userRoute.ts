import express from "express";
import { registerUser , loginController, updateProfile} from "../controller/userController";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginController);
router.put('/updateProfile',updateProfile)
export default router;
