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
      officeId: data.officeId,
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
      updatedAt: new Date(),
      addresses: {
        create: {
          street: data.address.street as string,
          number: data.address.number as string,
          complement: data.address.complement ? data.address.complement : "",
          district: data.address.district as string,
          city: data.address.city as string,
          state: data.address.state as string,
          cep: data.address.cep as string,
          updatedAt: new Date(),
        },
      },
      anamneses: {
        create: {
          reason: data.anamnese.reason,
          discomfort_mouth: data.anamnese.discomfort_mouth,
          high_pressure: data.anamnese.high_pressure,
          control_pressure: data.anamnese.control_pressure,
          oral_hygiene: data.anamnese.oral_hygiene,
          grind_teeth: data.anamnese.grind_teeth,
          allergy: data.anamnese.allergy,
          what_allergy: data.anamnese.what_allergy
            ? data.anamnese.what_allergy
            : "",
          drink_smoke: data.anamnese.drink_smoke,
          frequency: data.anamnese.frequency ? data.anamnese.frequency : "",
          bleeding: data.anamnese.bleeding,
          when_bleeding: data.anamnese.when_bleeding
            ? data.anamnese.when_bleeding
            : "",
          sensitivity: data.anamnese.sensitivity,
          prothesis: data.anamnese.prothesis,
          prothesis_type: data.anamnese.prothesis_type
            ? data.anamnese.prothesis_type
            : "",
          pregnant_breastfeeding: data.anamnese.pregnant_breastfeeding
            ? data.anamnese.pregnant_breastfeeding
            : "",
          pregnant_time: data.anamnese.pregnant_time
            ? data.anamnese.pregnant_time
            : "",
          updatedAt: new Date(),
        },
      },
    },
  });

  if (!patient) return null;

  return patient;
};

export const patientsByOfficeId = async (officeId: string) => {
  const patients = await prisma.patient.findMany({
    take: 10,
    where: {
      officeId,
    },
    include: {
      addresses: true,
      anamneses: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!patients) return null;

  return patients;
};
