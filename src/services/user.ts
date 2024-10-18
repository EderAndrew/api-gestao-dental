import { prisma } from "../utils/prisma";
import { User } from "../types/user";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) return null;

  return user;
};

export const postUser = async (data: User) => {
  const user = await prisma.user.create({
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

export const findUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) return null;

  return user;
};

export const putUpdateUser = async (data: User, id: number) => {
  const user = await prisma.user.update({
    where: { id },
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

export const allUsers = async () => {
  const users = await prisma.user.findMany();

  if (!users) return null;

  return users;
};

export const deleteUserById = async (id: number) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      status: false,
    },
  });

  if (!user) return null;

  return user;
};

export const getUsersByOfficeIdentity = async (identity: string) => {
  const users = await prisma.user.findMany({
    where: {
      officeId: identity,
    },
  });

  if (!users) return null;

  return users;
};
