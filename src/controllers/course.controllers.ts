import bcrypt from "bcryptjs";
import Course from "../models/course.model";
import { Request, Response } from "express";
import { cloudinaryInstance } from "../config/cloudinary";
import Instructor from "../models/instructor.model";

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find();
        return res.status(200).json(
            {
                success: true,
                data: courses
            }
        );
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json(
                {
                    success: false,
                    error: "file is not visible"
                }
            );
        }
        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }
            console.log('url', result?.url)
            const imageUrl = result?.url;

            const body = req.body;
            console.log(body, "body");

            const { title, description, price, instructorEmail } = body;

            const findInstructor = await Instructor.findOne({ email: instructorEmail });

            if (!findInstructor) {
                return res.status(400).json(
                    {
                        success: false,
                        error: "please add instructor first"
                    }
                );
            }

            const createCourse = new Course({
                title,
                description,
                price,
                instructor: findInstructor._id,
                image: imageUrl,
            });


            const newCourseCreated = await createCourse.save();
            if (!newCourseCreated) {
                return res.status(500).json(
                    {
                        success: false,
                        error: "course is not created"
                    }
                );
            }
            return res.status(201).json(
                {
                    success: true,
                    data: newCourseCreated
                }
            );
        });
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};


export const updateCourse = async (req: Request, res: Response) => {
   try {
     const id = req.params.id;
     const { description, price, instructor } = req.body
     const updatedCourse = await Course.findOneAndUpdate(
         { _id: id },
         { description, price, instructor },
         {
             new: true,
         }
     );
 
     if (!updatedCourse) {
         return res.status(500).json(
             {
                 success: false,
                 error: "Course is not updated"
             }
         );
     }
     console.log(updatedCourse);
     return res.status(201).json(
         {
             success: true,
             data: updateCourse
         }
     );
   } catch (error: any) {
    res.status(500).json(
        {
            success: false,
            error: error.message
        }
    )
}
};


export const deleteCourse = async (req: Request, res: Response) => {
   try {
     const id = req.params.id;
     const deleteId = await Course.deleteOne({ _id: id });
     if (!deleteId) {
         return res.status(500).json(
             {
                 success: false,
                 error: "not deleted"
             }
         );
     }
     return res.status(200).json(
         {
             success: true,
             message: "Course deleted successfully"
         }
     );
   } catch (error: any) {
    res.status(500).json(
        {
            success: false,
            error: error.message
        }
    )
}
};