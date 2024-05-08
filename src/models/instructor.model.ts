import mongoose from "mongoose";

export type InstructorType = {
  name: string;
  email: string;
  role: string;
  courses: [];
};

const instructorSchema = new mongoose.Schema<InstructorType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["instructor", "admin"],
    },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
