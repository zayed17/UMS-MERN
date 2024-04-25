import express from "express";
import {adminLogin, deleteUser, getUser, updateUser } from "../controller/adminController";

const router = express.Router();

router.post("/", adminLogin);
router.get("/dashboard", getUser);
router.put("/updateuser", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;

