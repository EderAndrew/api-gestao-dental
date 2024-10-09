import { Role } from "@prisma/client";

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  tel?: string;
  status?: boolean;
  role: Role;
  officeId?: string;
  firstAccess?: boolean;
  addresses?: [];
  sessions?: [];
  createdAt?: Date;
  updatedAt?: Date;
};
