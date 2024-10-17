import { NextFunction, Request, Response } from "express";
import { Token } from "../types/token";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";

export const createJWT = (payload: Token) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const verifyJWT = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ message: "Acesso negado." });

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err, payload: any) => {
      if (err) return res.status(401).json({ message: "Acesso negado." });

      const user = await findUserById(payload.id);

      if (!user) return res.status(401).json({ message: "Acesso negado." });

      req.userId = user.id;

      next();
    }
  );
};
