import { Prisma } from "@prisma/client";
import { OfficeT } from "../types/office";
import { prisma } from "../utils/prisma";

export const findOfficeByCNPJ = async (cnpj: string) => {
  const office = await prisma.office.findFirst({
    where: { cnpj },
  });

  if (!office) return false;

  return true;
};

export const postNewOffice = async (data: OfficeT) => {
  let office: Prisma.OfficeCreateInput;

  if (data.addresses?.street) {
    office = {
      identity: data.identity,
      corporate: data.corporate,
      name: data.name,
      tel: data.tel ? data.tel : "",
      cnpj: data.cnpj,
      status: data.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      addresses: {
        create: {
          street: data.addresses.street as string,
          number: data.addresses.number as string,
          complement: data.addresses.complement as string,
          district: data.addresses.district as string,
          city: data.addresses.city as string,
          state: data.addresses.state as string,
          cep: data.addresses.cep as string,
          updatedAt: new Date(),
        },
      },
    };
  } else {
    office = {
      identity: data.identity,
      corporate: data.corporate,
      name: data.name,
      tel: data.tel ? data.tel : "",
      cnpj: data.cnpj,
      status: data.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  const resp = await prisma.office.create({
    data: office,
  });

  if (!resp) return null;

  return resp;
};
