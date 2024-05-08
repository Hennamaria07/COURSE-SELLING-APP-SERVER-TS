import express from "express";
import authenticateUser from "../middlewares/instructor.middleware";
import authenticateAdmin from "../middlewares/admin.middleware";
import { getAllInstructors, removeInstructor, signin, signup } from "../controllers/instructor.controller";

const router = express.Router();

router.route('/sign-up').post(signup);
router.route('/sign-in').post(signin);
router.route('/get-instructors').get(getAllInstructors);
router.route('/remove-instructor/:id').delete(authenticateUser, authenticateAdmin, removeInstructor);

export default router;