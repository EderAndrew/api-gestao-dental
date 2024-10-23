export type TAddress = {
  id?: number;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  userId?: number;
  officeId?: string;
  patientId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
