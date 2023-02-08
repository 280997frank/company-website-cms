import { IResPagination } from "./pagination";
import {
  IPortofolio,
  IPortofolioDetail,
  IReqPortofolioDetail,
} from "./portofolio";

export interface IResGetEvent {
  getVirtualEvent: IPortofolio;
}
export interface IReqEvent {
  input: IPortofolio;
}
export interface IResGetEventWorks {
  getEventWorks: IResListEventWork;
}

export interface IReqActiveEventWork {
  input: {
    id: number;
    status: boolean;
  };
}

export interface IResListEventWork extends IResPagination {
  eventWorks: IPortofolioDetail[];
}

export interface IResGetEventWorkById {
  getEventWorkById: IPortofolioDetail;
}

export interface IReqAddEventWork {
  input: IReqPortofolioDetail;
}

export interface IReqEditEventWork {
  input: {
    id: number;
  } & IReqPortofolioDetail;
}

export interface IReqDeleteEventWork {
  input: number;
}

export interface IResDeleteEventWork {
  success: boolean;
}
