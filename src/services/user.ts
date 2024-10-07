import { prisma } from "../utils/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });

  if (!user) return null;

  return user;
};
