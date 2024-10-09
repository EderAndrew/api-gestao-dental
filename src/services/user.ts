import { users } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { User } from "../types/user";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });

  if (!user) return null;

  return user;
};

export const postUser = async (data: User) => {
  const user = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      tel: data.tel as string,
      status: data.status,
      role: data.role,
      officeId: data.officeId as string,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt as Date,
    },
  });

  if (!user) return null;

  return user;
};
