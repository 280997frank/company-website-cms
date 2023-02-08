import { EOrderType, ESortType, IReqPagination } from "@/types/pagination";
import { IReqPortofolioDetail } from "@/types/portofolio";
import { object } from "yup";
import { requiredString } from "./validationSchema";

export enum PORTOFOLIO_KEYS {
  events,
  solutions,
  studios,
}

export enum PORTOFOLIO_ROUTES {
  events = "events",
  solutions = "solutions",
  studios = "studios",
}

export enum PORTOFOLIO_COLORS {
  events = "brand.zodiacEvents",
  solutions = "brand.zodiacSolutions",
  studios = "brand.zodiacStudios",
}

export enum PORTOFOLIO_TITLES {
  events = "DIGITAL & EVENT",
  solutions = "INTERACTIVE & MULTIMEDIA",
  studios = "DESIGN & ANIMATION",
}

export const INITIAL_PORTO_DETAIL: IReqPortofolioDetail = {
  title: "",
  banner: "",
  clientName: "",
  description: "",
  projectYear: 0,
  category: "",
  sequence: 0,
  subTitle: "",
  heroVideoUrl: "",
  thumbnails: [],
};

export const validationSchemaPortoDetail = object({
  title: requiredString,
});

export const INITIAL_PAGINATION: IReqPagination = {
  page: 1,
  limit: 10,
  search: {
    keyword: "",
  },
  order: {
    orderBy: EOrderType.SEQUENCE,
    sortBy: ESortType.ASC,
  },
};

export const INITIAL_PORTOFOLIO_MAIN = {
  title: "",
  descriptionOne: "",
};

export const VALIDATION_PORTOFOLIO_MAIN = object({
  title: requiredString,
  descriptionOne: requiredString,
});
