import express from "express";
import { signin, signup } from "../controllers/user.controllers";
import authenticateUser from "../middlewares/user.middleware";

const router = express.Router();

router.route('/sign-up').post(signup);
router.route('/sign-in').post(signin);

export default router;