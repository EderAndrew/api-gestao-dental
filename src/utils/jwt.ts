import { Token } from "../types/token";
import jwt from "jsonwebtoken";

export const createJWT = (payload: Token) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};
