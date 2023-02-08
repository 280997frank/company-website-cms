export enum EOrderType {
  CREATED_AT = "CREATED_AT",
  CITY_NAME = "CITY_NAME",
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
export interface TDataLocations {
  id: string;
  email: string;
  isActive: number;
  cityName: string;
  address: string;
  phoneNumber: string;
  image: string | File;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  wechat: string;
  whatsapp: string;
  urlMap: string;
  facebookActive: boolean;
  whatsappActive: boolean;
  wechatActive: boolean;
  linkedinActive: boolean;
  youtubeActive: boolean;
  instagramActive: boolean;
}

export interface IListLocationsResponse {
  listLocations: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    locations: TDataLocations[];
  };
}

export interface TAddLocationResponse {
  addLocation: TDataLocations;
}

export interface TLocationByIdResponse {
  getLocationById: TDataLocations;
}

export interface TAddLocationtArgs {
  input: {
    email: string;
    cityName: string;
    address: string;
    phoneNumber: string;
    image: string | File;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    wechat: string;
    whatsapp: string;
    urlMap: string;
    intercom: string;
    facebookActive: boolean;
    whatsappActive: boolean;
    wechatActive: boolean;
    linkedinActive: boolean;
    youtubeActive: boolean;
    instagramActive: boolean;
  };
}
export interface TEditLocationResponse {
  editLocation: TDataLocations;
}
export interface TEditLocationtArgs {
  input: {
    id: string;
    email: string;
    cityName: string;
    address: string;
    phoneNumber: string;
    image: string | File;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    wechat: string;
    whatsapp: string;
    urlMap: string;
    intercom: string;
    facebookActive: boolean;
    whatsappActive: boolean;
    wechatActive: boolean;
    linkedinActive: boolean;
    youtubeActive: boolean;
    instagramActive: boolean;
  };
}
export interface TDeleteLocationResponse {
  success: boolean;
}
export interface TDeleteLocationArg {
  id: string;
}
export interface PublishLocationResponse {
  toggleActiveLocation: TDataLocations;
}
export interface PublishLocationtArg {
  input: {
    id: string;
    status: boolean;
  };
}

export interface TLocationByIdArgs {
  id: string;
}
