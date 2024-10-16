import { z } from "zod";

const ROLE = ["USER", "ADMIN", "BACKOFFICE", "PATIENT"] as const;

export const userSchema = z.object({
  name: z.string({ message: "Nome é obrigatorio." }),
  email: z.string({ message: "Email é obrigatorio." }).email("Email inválido."),
  password: z
    .string({ message: "Senha é obrigatória." })
    .min(8, "Precisa ter 4 ou mais caracteres.")
    .optional(),
  tel: z.string().optional(),
  status: z.boolean().optional(),
  role: z.enum(ROLE).default("USER"),
  officeId: z.string().optional(),
  firstAccess: z.boolean().optional(),
  addresses: z.array(z.object({})).optional(),
  sessions: z.array(z.object({})).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
