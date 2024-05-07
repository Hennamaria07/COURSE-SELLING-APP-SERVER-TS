import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { UserType } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = await req.body as UserType
        if ([email, password, firstName, lastName].some((field) => !field)) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({
                success: false,
                error: "User already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password || "", 10);

        const user = new User({
            email,
            firstName,
            lastName,
            password: hashPassword,
        });

        const userCreated = await user.save();

        if (!userCreated) {
            return res.status(500).json({
                success: false,
                error: "user is not created"
            })
        }

        const token = await generateToken(email || "");
        res.status(201)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Signed successfully!",
                data: userCreated
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
        const { email, password } = req.body as UserType;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "user not found"
            })
        }

        const matchPassword = await bcrypt.compare(password || "", user.password || "");

        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            })
        }

        const token = generateToken(email!);
        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Logged in successfully!",
                data: user
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
