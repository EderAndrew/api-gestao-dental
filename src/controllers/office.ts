import { RequestHandler } from "express";
import { officeSchema } from "../schemas/officeSchema";
import { findOfficeByCNPJ, postNewOffice } from "../services/office";
import { OfficeT } from "../types/office";

export const createOffice: RequestHandler = async (req, res): Promise<any> => {
  try {
    //* Recebe as informações do consultorio
    const safeData = officeSchema.safeParse(req.body);
    if (!safeData.success) {
      return res
        .status(400)
        .json({ error: safeData.error.flatten().fieldErrors });
    }
    //* Verifica se o CNPJ já existe no banco
    const haveCNPJ = await findOfficeByCNPJ(safeData.data.cnpj);

    //* Se existir, retorna mensagem que já existe um consultorio com esse CNPJ
    if (haveCNPJ) {
      return res
        .status(400)
        .json({ message: "Já existe um consultório com esse CNPJ." });
    }

    //*Caso não, preenche os dados do consultorio em um objeto
    const data = {
      identity: safeData.data.identity,
      corporate: safeData.data.corporate,
      name: safeData.data.name,
      tel: safeData.data.tel ? safeData.data.tel : undefined,
      cnpj: safeData.data.cnpj,
      status: safeData.data.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      addresses: safeData.data.addresses,
    };

    //* Cria o consultorio
    const newOffice = await postNewOffice(data as OfficeT);

    //* Se der tudo erro, retorna mensagem de erro
    if (!newOffice) {
      return res
        .status(400)
        .json({ message: "Erro ao cadastrar consultório." });
    }

    //* Retorna mensagem de sucesso
    return res.status(200).json({ message: "Consultório criado com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
