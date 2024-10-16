export type OfficeT = {
  identity: string;
  corporate: string;
  name: string;
  tel?: string;
  cnpj: string;
  status: boolean;
  addresses?: {
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    cep?: string;
  };
};
