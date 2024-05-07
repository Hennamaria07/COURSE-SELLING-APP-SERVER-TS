import express from "express";
import { signup } from "../controllers/user.controllers";

const router = express.Router();

router.route('/sign-up').post(signup);

export default router;