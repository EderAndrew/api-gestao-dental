import { z } from "zod";

const ROLE = ["USER", "ADMIN", "BACKOFFICE", "PATIENT"] as const;

export const patientSchema = z.object({
  identity: z.string().optional(),
  name: z.string({ message: "Nome é obrigatorio." }),
  email: z.string().email().optional(),
  cpf: z.string({ message: "Documento é obrigatório." }),
  rg: z.string().optional(),
  birth_date: z.string({ message: "Data é obrigatória." }),
  tel: z.string({ message: "Telefone é obrigatório." }),
  career: z.string().optional(),
  gender: z.string({ message: "Genero é obrigatório." }),
  age: z.number({ message: "Idade é obrigatória." }),
  responsible_name: z.string().optional(),
  responsible_birth_date: z.string().optional(),
  contact_name: z.string().optional(),
  contact_tel: z.string().optional(),
  agreement: z.string(),
  agreement_card: z.string().optional(),
  holder_name: z.string().optional(),
  cpf_holder: z.string().optional(),
  note: z.string().optional(),
  status: z.boolean(),
  role: z.enum(ROLE).default("PATIENT"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  officeId: z.string(),
  address: z
    .object({
      street: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
      district: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      cep: z.string().optional(),
    })
    .optional(),
  anamnese: z
    .object({
      reason: z.string().optional(),
      discomfort_mouth: z.string().optional(),
      high_pressure: z.string().optional(),
      control_pressure: z.string().optional(),
      oral_hygiene: z.string().optional(),
      grind_teeth: z.string().optional(),
      allergy: z.string().optional(),
      what_allergy: z.string().optional(),
      drink_smoke: z.string().optional(),
      frequency: z.string().optional(),
      bleeding: z.string().optional(),
      when_bleeding: z.string().optional(),
      sensitivity: z.string().optional(),
      prothesis: z.string().optional(),
      prothesis_type: z.string().optional(),
      pregnant_breastfeeding: z.string().optional(),
      pregnant_time: z.string().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      patientId: z.number().optional(),
    })
    .optional(),
});
