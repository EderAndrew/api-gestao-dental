import { Request, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";

export const ping = async (req: Request, res: Response) => {
  res.status(200).json({ pong: true });
};

export const privatePing = async (req: ExtendedRequest, res: Response) => {
  res.status(200).json({ pong: true, id: req.userId });
};
