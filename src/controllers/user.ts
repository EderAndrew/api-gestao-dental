import { RequestHandler } from "express";
import { userSchema } from "../schemas/userSchema";
import { findUserByEmail, postUser } from "../services/user";
import { User } from "../types/user";

export const createUser: RequestHandler = async (req, res): Promise<any> => {
  try {
    //TODO: RECEBE AS INFORMAÇÕES DO USUARIO
    const safeData = userSchema.safeParse(req.body);
    if (!safeData.success) {
      return res
        .status(400)
        .json({ error: safeData.error.flatten().fieldErrors });
    }
    //TODO: VERIFICA SE O EMAIL JÁ EXISTE NO BANCO
    const haveUser = await findUserByEmail(safeData.data.email);

    //TODO: SE EXISTIR, RETORNA MENSAGEM DE ERRO.
    if (haveUser) {
      return res.status(400).json({ message: "Usuário ja existe." });
    }

    const resp = {
      name: safeData.data.name,
      email: safeData.data.email,
      password: safeData.data.password,
      tel: safeData.data.tel ? safeData.data.tel : undefined,
      role: safeData.data.role,
      officeId: safeData.data.officeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //TODO:SE NÃO, CRIA O USUÁRIO.
    const data = await postUser(resp);

    if (!data)
      return res.status(400).json({ message: "Erro ao criar o usuário." });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
