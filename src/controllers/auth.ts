import { RequestHandler } from "express";
import { signinSchema } from "../schemas/signin";
import { findUserByEmail } from "../services/user";
import { compare } from "bcrypt-ts";
import { createJWT } from "../utils/jwt";

export const signin: RequestHandler = async (req, res): Promise<any> => {
  try {
    const safeData = signinSchema.safeParse(req.body);
    if (!safeData.success) {
      return res
        .status(400)
        .json({ error: safeData.error.flatten().fieldErrors });
    }

    const user = await findUserByEmail(safeData.data.email);
    if (!user) return res.status(404).json({ message: "Acesso negado." });

    const hash = await compare(safeData.data.password, user.password);
    if (!hash) return res.status(404).json({ message: "Acesso negado." });

    const payload = {
      id: user.id,
      role: user.role,
      officeId: user.officeId ? user.officeId : null,
    };

    const token = createJWT(payload);

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
