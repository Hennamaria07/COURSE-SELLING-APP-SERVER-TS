import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import {Request, Response, NextFunction} from "express"
import User, { UserType } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Change 'any' to the actual type of your user object if possible
    }
  }
}


async function authenticateUser (req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if(!token) {
    return res.status(401).json({
        success: false,
        error:"Unauthenicated request",
        isAuthenticated: false
    });
};
const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!) as JwtPayload;
console.log('decoded token', decodedToken)
        const user = await User.findOne({email: decodedToken?.data as string}) 
        if(!user) {
            return res.status(404).json({
                success: false,
                error:"Invalid token",
                isAuthenticated: false
            });
        }
        console.log('decoded data', user)
        req.user = user;
        next();
}

export default authenticateUser;

        
        