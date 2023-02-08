import { IResPagination } from "./pagination";
import {
  IPortofolio,
  IPortofolioDetail,
  IReqEditPortofolioDetail,
  IReqPortofolioDetail,
} from "./portofolio";

export interface IResGetStudio {
  getStudio: IPortofolio;
}

export interface IReqStudio {
  input: IPortofolio;
}

export interface IResGetStudioWorks {
  getStudioWorks: IResListStudioWork;
}

export interface IReqActiveStudioWork {
  input: {
    id: number;
    status: boolean;
  };
}

export interface IResListStudioWork extends IResPagination {
  studioWorks: IPortofolioDetail[];
}

export interface IResGetStudioWorkById {
  getStudioWorkById: IPortofolioDetail;
}

export interface IReqAddStudioWork {
  input: IReqPortofolioDetail;
}

export interface IReqEditStudioWork {
  input: IReqEditPortofolioDetail;
}

export interface IReqDeleteStudioWork {
  input: number;
}

export interface IResDeleteStudioWork {
  success: boolean;
}
