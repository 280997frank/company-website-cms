export enum EOrderType {
  SEQUENCE = "SEQUENCE",
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  UPDATED_AT = "UPDATED_AT",
}
export enum ESortType {
  ASC = "ASC",
  DESC = "DESC",
}

export interface TPayload {
  input: {
    page: number;
    limit: number;
    search: {
      keyword: string;
    };
    order: {
      orderBy: EOrderType;
      sortBy: ESortType;
    };
  };
}
export interface TDataClients {
  id: string;
  name: string;
  logoUrl: string;
  isActive: number;
}
export interface IListClientsResponse {
  listClients: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    clients: TDataClients[];
  };
}

export interface TAddClientResponse {
  addClient: TDataClients;
}

export interface TClientByIdResponse {
  getClientById: TDataClients;
}

export interface TAddCLienttArgs {
  input: {
    name: string;
    logoUrl: string;
  };
}
export interface TEditClientResponse {
  editClient: TDataClients;
}
export interface TEditCLienttArgs {
  input: {
    id: string;
    name: string;
    logoUrl: string;
  };
}
export interface TDeleteClientResponse {
  success: boolean;
}
export interface TDeleteClientArg {
  id: string;
}
export interface PublishClientResponse {
  toggleActiveClient: TDataClients;
}
export interface PublishCLienttArg {
  input: {
    id: string;
    status: boolean;
  };
}

export interface TClientByIdArgs {
  id: string;
}
