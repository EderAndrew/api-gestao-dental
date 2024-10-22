import { RequestHandler } from "express";
import { patientSchema } from "../schemas/patientSchema";
import { findPatientByCPF, newPatient } from "../services/patient";
import { Patient } from "@prisma/client";

export const createPatient: RequestHandler = async (req, res): Promise<any> => {
  try {
    const safeData = patientSchema.safeParse(req.body);

    if (!safeData.success) {
      return res
        .status(400)
        .json({ error: safeData.error.flatten().fieldErrors });
    }

    //*Verifica se o CPF já existe no consultório
    const haveCPF = await findPatientByCPF(
      safeData.data.cpf,
      safeData.data.officeId
    );

    if (haveCPF) {
      return res.status(400).json({ message: "Paciente já esta cadastrado." });
    }

    //*Caso não, Cria o paciente
    const data: Patient = {
      identity: safeData.data.identity ? safeData.data.identity : "",
      name: safeData.data.name,
      email: safeData.data.email ? safeData.data.email : "",
      cpf: safeData.data.cpf,
      rg: safeData.data.rg ? safeData.data.rg : "",
      birth_date: safeData.data.birth_date,
      tel: safeData.data.tel,
      career: safeData.data.career ? safeData.data.career : "",
      gender: safeData.data.gender,
      age: safeData.data.age,
      responsible_name: safeData.data.responsible_name
        ? safeData.data.responsible_name
        : "",
      responsible_birth_date: safeData.data.responsible_birth_date
        ? safeData.data.responsible_birth_date
        : "",
      contact_name: safeData.data.contact_name
        ? safeData.data.contact_name
        : "",
      contact_tel: safeData.data.contact_tel ? safeData.data.contact_tel : "",
      agreement: safeData.data.agreement,
      agreement_card: safeData.data.agreement_card
        ? safeData.data.agreement_card
        : "",
      holder_name: safeData.data.holder_name ? safeData.data.holder_name : "",
      cpf_holder: safeData.data.cpf_holder ? safeData.data.cpf_holder : "",
      note: safeData.data.note ? safeData.data.note : "",
      status: safeData.data.status,
      role: safeData.data.role,
      createdAt: new Date(safeData.data.createdAt as Date),
      updatedAt: new Date(safeData.data.updatedAt as Date),
      officeId: safeData.data.officeId,
      addresses: safeData.data.addresses ? safeData.data.addresses : undefined,
      anamnese: safeData.data.anamnese,
    };

    //*Salva o Paciente
    const patient = await newPatient(data);

    if (!patient) {
      return res.status(400).json({ message: "Erro ao cadastrar o paciente." });
    }

    return res.status(200).json({ patient });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
