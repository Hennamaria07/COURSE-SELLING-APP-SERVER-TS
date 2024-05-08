import express from "express";
import { createCourse, getCourses } from "../controllers/course.controllers";
import upload from "../middlewares/multer.middleware";

const router = express.Router();

router.route('/get-courses').get(getCourses);
router.route('/').post(upload.single('image'), createCourse);

export default router;