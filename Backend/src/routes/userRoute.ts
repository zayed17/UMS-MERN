import express from "express";
import { registerUser , loginController} from "../controller/userController";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginController);

export default router;
