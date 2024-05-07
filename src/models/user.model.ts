import mongoose, {Schema, Document} from "mongoose";

export interface UserType extends Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    courses?: [];
}

const userSchema = new Schema<UserType>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: [3, "First name should contain atleast 3 characters"],
            max: [10, "First name should not be excceed more than 10 characters"]
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: [3, "Last name should contain atleast 3 characters"],
            max: [10, "Last name should not be excceed more than 10 characters"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User;