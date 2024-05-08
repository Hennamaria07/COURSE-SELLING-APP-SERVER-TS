import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import Instructor, { InstructorType } from "../models/instructor.model";
import { adminToken } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = await req.body
        if ([email, password, name].some((field) => !field)) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        const instructorExist = await Instructor.findOne({ email });

        if (instructorExist) {
            return res.status(409).json({
                success: false,
                error: "instructor already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password || "", 10);

        const instructor = new Instructor({
            email,
            name,
            password: hashPassword,
        });

        const instructorCreated = await instructor.save();

        if (!instructorCreated) {
            return res.status(500).json({
                success: false,
                error: "instructor is not created"
            })
        }

        const token = adminToken(instructorCreated);
        res.status(201)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Signed successfully!",
                data: instructorCreated
            })
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as InstructorType

        const instructor = await Instructor.findOne({ email });

        if (!instructor) {
            return res.status(404).json({
                success: false,
                error: "instructor not found"
            })
        }

        const matchPassword = await bcrypt.compare(password || "", instructor.password || "");

        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            })
        }

        const token = adminToken(instructor);
        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Logged in successfully!",
                data: instructor
            })
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};

export const getAllInstructors = async (req: Request, res: Response) => {
    try {
        const instructors = await Instructor.find();
        return res.status(200).json(
            {
                success: true,
                data: instructors
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
}

export const removeInstructor = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const instructor = await Instructor.find({ _id: id });
      if (!instructor) {
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
              message: "instructor removed successfully"
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