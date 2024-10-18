import { RequestHandler } from "express";
import { userSchema } from "../schemas/userSchema";
import {
  allUsers,
  deleteUserById,
  findUserByEmail,
  findUserById,
  getUsersByOfficeIdentity,
  postUser,
  putUpdateUser,
} from "../services/user";
import { hashSync } from "bcrypt-ts";
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
    const hash = hashSync(safeData.data.email, 10);

    const resp = {
      name: safeData.data.name,
      email: safeData.data.email,
      password: hash,
      tel: safeData.data.tel ? safeData.data.tel : undefined,
      role: safeData.data.role,
      officeId: safeData.data.officeId ? safeData.data.officeId : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //TODO:SE NÃO, CRIA O USUÁRIO.
    const data = await postUser(resp);

    if (!data)
      return res.status(400).json({ message: "Erro ao criar o usuário." });

    return res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUserById: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await findUserById(parseInt(id));

    if (!user)
      return res.status(404).json({ message: "Usurário não encontrado." });

    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const updateUser: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    const safeData = userSchema.safeParse(req.body);
    if (!safeData.success) {
      return res
        .status(400)
        .json({ error: safeData.error.flatten().fieldErrors });
    }

    const haveUser = await findUserByEmail(safeData.data.email);
    if (!haveUser)
      return res.status(404).json({ message: "Usurário não encontrado." });

    const hash = hashSync(safeData.data.password as string, 10);

    const resp = {
      name: safeData.data.name,
      email: safeData.data.email,
      password: hash,
      tel: safeData.data.tel ? safeData.data.tel : undefined,
      role: safeData.data.role,
      officeId: safeData.data.officeId ? safeData.data.officeId : undefined,
      updatedAt: new Date(),
    };

    const data = await putUpdateUser(resp, parseInt(id));

    if (!data)
      return res.status(400).json({ message: "Erro ao atualizar o usuário." });

    return res
      .status(200)
      .json({ message: "Usurário atualizado com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getAllUsers: RequestHandler = async (req, res): Promise<any> => {
  try {
    const users = await allUsers();

    if (!users)
      return res.status(400).json({ message: "Erro ao buscar os usuários." });

    return res.status(200).json({ users });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const deleteUser: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    const data = await deleteUserById(parseInt(id));

    if (!data)
      return res
        .status(400)
        .json({ message: "Erro ao desabilitar o usuário." });

    return res
      .status(200)
      .json({ message: "Usuário desabilitado com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getUsersByOffice: RequestHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const { officeIdentity } = req.params;
    const users = await getUsersByOfficeIdentity(officeIdentity);

    if (!users)
      return res.status(400).json({ message: "Erro ao buscar os usuários." });

    return res.status(200).json({ users });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
