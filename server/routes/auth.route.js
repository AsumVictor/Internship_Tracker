import express from "express";

const router = express.Router();

import { register, login, getUser } from "../controller/auth.controller.js";

router.post("/register", register);
router.post("/login", login);
router.get('/', getUser)



export default router;
