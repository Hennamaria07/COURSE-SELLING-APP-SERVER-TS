import jwt from "jsonwebtoken";

export const generateToken = async (email: string) => {
  return jwt.sign({ data: email }, process.env.ACCESS_TOKEN_SECRET_KEY || "", { expiresIn: "1d" });
};
