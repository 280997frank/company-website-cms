import { IResPagination } from "./pagination";
import {
  IPortofolio,
  IPortofolioDetail,
  IReqPortofolioDetail,
} from "./portofolio";

export interface IResGetSolution {
  getSolution: IPortofolio;
}

export interface IReqSolution {
  input: IPortofolio;
}
export interface IResGetSolutionWorks {
  getSolutionWorks: IResListSolutionWork;
}

export interface IReqActiveSolutionWork {
  input: {
    id: number;
    status: boolean;
  };
}

export interface IResListSolutionWork extends IResPagination {
  solutionWorks: IPortofolioDetail[];
}

export interface IResGetSolutionWorkById {
  getSolutionWorkById: IPortofolioDetail;
}
export interface IReqAddSolutionWork {
  input: IReqPortofolioDetail;
}

export interface IReqEditSolutionWork {
  input: {
    id: number;
  } & IReqPortofolioDetail;
}

export interface IReqDeleteSolutionWork {
  input: number;
}

export interface IResDeleteSolutionWork {
  success: boolean;
}
