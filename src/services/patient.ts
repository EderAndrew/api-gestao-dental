import { Patient } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { TPatient } from "../types/patient";

export const findPatientByCPF = async (cpf: string, officeId: string) => {
  const data = await prisma.patient.findFirst({
    where: {
      cpf,
      officeId,
    },
  });

  if (!data) return null;

  return data;
};

export const newPatient = async (data: TPatient) => {
  const patient = await prisma.patient.create({
    data: {
      identity: data.identity,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      rg: data.rg,
      birth_date: data.birth_date,
      tel: data.tel,
      career: data.career ? data.career : "",
      gender: data.gender,
      age: data.age,
      responsible_name: data.responsible_name,
      responsible_birth_date: data.responsible_birth_date,
      contact_name: data.contact_name,
      contact_tel: data.contact_tel,
      agreement: data.agreement,
      agreement_card: data.agreement_card,
      holder_name: data.holder_name,
      cpf_holder: data.cpf_holder,
      note: data.note,
      status: data.status,
    },
  });

  if (!patient) return null;

  return patient;
};
