import express from "express";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/course.controllers";
import upload from "../middlewares/multer.middleware";
import authenticateUser from "../middlewares/instructor.middleware";
import authenticateAdmin from "../middlewares/admin.middleware";

const router = express.Router();

router.route('/get-courses').get(getCourses);
router.route('/').post(authenticateUser, authenticateAdmin, upload.single('image'), createCourse);
router.route('/update-courses/:id').patch(authenticateUser, authenticateAdmin, updateCourse);
router.route('/delete-courses/:id').delete(authenticateUser, authenticateAdmin, deleteCourse);

export default router;