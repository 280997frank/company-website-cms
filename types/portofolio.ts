import { PORTOFOLIO_KEYS } from "@/constants/portofolio";

// 👇️ type Keys = "events" | "solutions" | "studios"
export type TPortofolioKeys = keyof typeof PORTOFOLIO_KEYS;

export interface IPortofolio {
  title: string;
  descriptionOne: string;
  descriptionTwo?: string;
}

export interface IReqPortofolioDetail {
  title: string;
  subTitle: string;
  description: string;
  clientName: string;
  projectYear: number;
  banner: string | File;
  category: string;
  heroVideoUrl: string | File;
  sequence: number;
  thumbnails: IThumbnail[] | string[];
}

export interface IReqEditPortofolioDetail
  extends Omit<IPortofolioDetail, "isActive"> {
  id: number;
  isActive?: boolean;
}

export interface IPortofolioDetail extends IReqPortofolioDetail {
  id: number;
  isActive: boolean;
}

export interface IThumbnail {
  id: number;
  url: string | File;
}

export type TPortofolioMainProps = React.FC<{
  type: TPortofolioKeys;
  data: IPortofolio | null;
  onSubmit: (payload: IPortofolio) => Promise<void>;
}>;

export interface ISwitchActive {
  id: number;
  status: boolean;
}

export type TPortofolioTableProps = React.FC<{
  type: TPortofolioKeys;
  tableData: IPortofolioDetail[];
  isLoading: boolean;
  hoverColor: string;
  onSwitchActive: (payload: ISwitchActive) => Promise<void>;
  onSearch: (val: string) => void;
  onRemove: (val: number) => Promise<void>;
  onRowSwitch: (payload: IReqEditPortofolioDetail) => Promise<void>;
}>;

export type TPortofolioDetailFormProps = React.FC<{
  type: TPortofolioKeys;
  data: IPortofolioDetail | null;
  defaultSquence: number;
  onSubmit: (payload: IReqPortofolioDetail) => Promise<void>;
}>;
