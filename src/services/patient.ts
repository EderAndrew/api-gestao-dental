import { Patient } from "@prisma/client";
import { prisma } from "../utils/prisma";

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

export const newPatient = async (data: Patient) => {
  const patient = await prisma.patient.create({
    data,
  });

  if (!patient) return null;

  return patient;
};
