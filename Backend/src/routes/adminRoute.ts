import express from "express";
import {adminLogin, deleteUser, getUser, updateUser ,addUser, auth} from "../controller/adminController";
import {authenticateAdmin} from "../middleware/authMiddleware";
import upload from "../middleware/multer";
const router = express.Router();

router.get("/auth",authenticateAdmin, auth);
router.post("/", adminLogin);
router.get("/dashboard", getUser);
router.put("/updateuser",upload.single('image'), updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/addUser",upload.single('image'),addUser)

export default router;

