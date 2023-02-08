export interface ISearch {
  keyword: string;
}

export interface IFilter {
  isActive: boolean;
}

export enum EOrderType {
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
  UPDATED_AT = "UPDATED_AT",
  SEQUENCE = "SEQUENCE",
}

export enum ESortType {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IOrderBy {
  orderBy: EOrderType;
  sortBy: ESortType;
}

export interface IReqPagination {
  page: number;
  limit: number;
  search?: ISearch;
  filter?: IFilter;
  order?: IOrderBy;
}

export interface IResPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
