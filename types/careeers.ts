export interface IGetMainCareersResponse {
  getCareer: {
    id: string;
    title: string;
    description: string;
  };
}

export interface TSaveMainCareersResponse {
  saveCareer: {
    id: string;
    title: string;
    description: string;
  };
}
export interface TSaveMainCareersArgs {
  input: {
    id: string;
    title: string;
    description: string;
    description2: string;
  };
}
export enum EOrderType {
  SEQUENCE = "SEQUENCE",
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  UPDATED_AT = "UPDATED_AT",
  CITY_NAME = "CITY_NAME",
}
export enum ESortType {
  ASC = "ASC",
  DESC = "DESC",
}

export enum TJObType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  FREELANCE = "FREELANCE",
}
export interface TDataDesignation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: number;
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
    filter?: {
      designationId: string;
    };
  };
}

export interface TPayloadJobOpening {
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
    filter: {
      designationId: string;
    };
  };
}

export interface TListDesignationsResponse {
  listDesignations: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    designations: TDataDesignation[];
  };
}

export interface PublishDesignationResponse {
  toggleActiveDesignation: TDataDesignation;
}
export interface PublishDesignationArg {
  input: {
    id: string;
    status: boolean;
  };
}

export interface TDeleteDesignationResponse {
  success: boolean;
}
export interface TDeleteDesignationArg {
  id: string;
}

export interface TDesignationByIdArgs {
  id: string;
}
export interface TDesignationByIdResponse {
  getDesignationById: TDataDesignation;
}
export interface TAddDesignationResponse {
  addDesignation: TDataDesignation;
}
export interface TAddDesignationArgs {
  input: {
    name: string;
    imageUrl: string;
    description: string;
  };
}

export interface TEditDesignationArgs {
  input: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
  };
}

export interface TEditDesignationResponse {
  editDesignation: TDataDesignation;
}

export interface TDataJobOpening {
  id: string;
  title: string;
  jobType: TJObType;
  ofOpenings: Number;
  applyUrl: string;
  description: string;
  location: {
    id: string;
    cityName: string;
  };
  locationName: string;
  designation: {
    id: string;
    name: string;
  };
  isActive: boolean;
}

// export interface TDataJobOpening2 {
//   id: string;
//   title: string;
//   jobType: TJObType;
//   locationName: string;
//   isActive: boolean;
//   ofOpenings: Number;

//   designation: {
//     id: string;
//   };
// }

export interface TListJobOpeningResponse {
  listJobOpenings: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    jobOpenings: TDataJobOpening[];
  };
}

export interface PublishJobOpeningnResponse {
  toggleActiveJobOpening: TDataJobOpening;
}
export interface PublishJobOpeningArg {
  input: {
    id: string;
    status: boolean;
  };
}
export interface TDeleteJobOpeningResponse {
  success: boolean;
}
export interface TDeleteJobOpeningArg {
  id: string;
}

export interface TJobOpeningByIdResponse {
  getJobOpeningById: TDataJobOpening;
}
export interface TJobOpeningByIdArgs {
  id: string;
}

export interface TAddJobOpeningResponse {
  addJobOpening: TDataJobOpening;
}
export interface TAddJobOpeningArgs {
  input: {
    title: string;
    jobType: TJObType;
    applyUrl: string;
    ofOpenings: Number;
    description: string;
    locationId: string;
    designationId: string;
  };
}

export interface TEditJobOpeningResponse {
  editJobOpening: TDataJobOpening;
}
export interface TEditJobOpeningArgs {
  input: {
    id: string;
    title: string;
    jobType: TJObType;
    applyUrl: string;
    ofOpenings: Number;
    description: string;
    locationId: string;
    designationId: string;
  };
}

export interface Tlocations {
  id: string;
  cityName: string;
}
export interface TListDataLocationsResponse {
  listLocations: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    locations: Tlocations[];
  };
}
