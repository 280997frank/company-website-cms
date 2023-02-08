export enum ELabsOrderType {
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
  UPDATED_AT = "UPDATED_AT",
}
export enum ELabsSortType {
  ASC = "ASC",
  DESC = "DESC",
}

export interface CategoryOption {
  readonly value: string;
  readonly label: string;
}
export interface TLabListPayload {
  input: {
    page: number;
    limit: number;
    // filter: {
    //   isActive: boolean;
    //   category: string;
    // };
    search: {
      keyword: string;
    };
    order: {
      orderBy: ELabsOrderType;
      sortBy: ELabsSortType;
    };
  };
}

export interface TDataLabPost {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  thumbnail: string;
  isActive: boolean;
  RndCategory: {
    id: string;
    title: string;
  };
}

export interface TRndCategory {
  id: string;
  title: string;
}

export interface IListLabPostResponse {
  listRndPost: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    rndPost: TDataLabPost[];
  };
}

export interface IListCategoryResponse {
  listRndCategory: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    rndCategory: TRndCategory[];
  };
}

export interface PublishRndPostResponse {
  toggleActiveRndPost: TDataLabPost;
}
export interface PublishRndPostArg {
  input: {
    id: string;
    status: boolean;
  };
}

export interface TLabPostByIdResponse {
  getRndPostById: TDataLabPost;
}

export interface TLabPostByIdArgs {
  id: string;
}
