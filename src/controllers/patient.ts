import { RequestHandler } from "express";
import { patientSchema } from "../schemas/patientSchema";
import {
  findPatientByCPF,
  newPatient,
  patientsByOfficeId,
} from "../services/patient";
import { TPatient } from "../types/patient";

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
    const data: TPatient = {
      identity: safeData.data!.identity as string,
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
      officeId: safeData.data.officeId,
      address: {
        street: safeData.data.address?.street as string,
        number: safeData.data.address?.number as string,
        complement: safeData.data.address?.complement as string,
        district: safeData.data.address?.district as string,
        city: safeData.data.address?.city as string,
        state: safeData.data.address?.state as string,
        cep: safeData.data.address?.cep as string,
      },
      anamnese: {
        reason: safeData.data.anamnese?.reason as string,
        discomfort_mouth: safeData.data.anamnese?.discomfort_mouth as string,
        high_pressure: safeData.data.anamnese?.high_pressure as string,
        control_pressure: safeData.data.anamnese?.control_pressure as string,
        oral_hygiene: safeData.data.anamnese?.oral_hygiene as string,
        grind_teeth: safeData.data.anamnese?.grind_teeth as string,
        allergy: safeData.data.anamnese?.allergy as string,
        what_allergy: safeData.data.anamnese?.what_allergy as string,
        drink_smoke: safeData.data.anamnese?.drink_smoke as string,
        frequency: safeData.data.anamnese?.frequency as string,
        bleeding: safeData.data.anamnese?.bleeding as string,
        when_bleeding: safeData.data.anamnese?.when_bleeding as string,
        sensitivity: safeData.data.anamnese?.sensitivity as string,
        prothesis: safeData.data.anamnese?.prothesis as string,
        prothesis_type: safeData.data.anamnese?.prothesis_type as string,
        pregnant_breastfeeding: safeData.data.anamnese
          ?.pregnant_breastfeeding as string,
        pregnant_time: safeData.data.anamnese?.pregnant_time as string,
      },
    };

    //*Salva o Paciente
    const patient = await newPatient(data);

    if (!patient) {
      return res.status(400).json({ message: "Erro ao cadastrar o paciente." });
    }

    return res
      .status(200)
      .json({ message: "Paciente cadastrado com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getPatientsByOfficeId: RequestHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const { officeIdentity } = req.params;
    const patients = await patientsByOfficeId(officeIdentity);

    if (!patients) {
      return res
        .status(400)
        .json({ message: "Não existe nenhum paciente para esse consultório." });
    }

    return res.status(200).json({ patients });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
