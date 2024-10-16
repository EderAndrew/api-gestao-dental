import { z } from "zod";

export const officeSchema = z.object({
  identity: z.string({ message: "Identificação é obrigatória." }),
  corporate: z.string({ message: "Razão social é obrigatória." }),
  name: z.string({ message: "Nome fantasia é obrigatório." }),
  tel: z.string().optional(),
  cnpj: z.string({ message: "CNPJ é obrigatório." }),
  status: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  addresses: z
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
});
