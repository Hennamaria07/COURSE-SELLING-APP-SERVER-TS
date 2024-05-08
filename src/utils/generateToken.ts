import jwt from "jsonwebtoken";
import { InstructorType } from "../models/instructor.model";

export const generateToken = async (email: string) => {
  return jwt.sign({ data: email }, process.env.ACCESS_TOKEN_SECRET_KEY || "", { expiresIn: "1d" });
};

export const adminToken = (user: InstructorType) => {
  return jwt.sign({ data: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET_KEY!, {
    expiresIn: "1d",
  });
};