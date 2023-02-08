export interface IUpSertOurProcess {
  id: string;
  description: string;
}
export interface IOurProcess {
  id?: string;
  title: string;
  subtitle: string;
  imageUrl: string | File;
  description: string;
  isActive?: boolean;
  sequence: number;
}
export interface IOurTeam {
  id?: string;
  title: string;
  description: string;
}

export interface IAboutMain extends IOurTeam {
  imageUrl: string | File;
  videoUrl: string | File;
}

export interface IOurTeamMember {
  id?: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  designation: string;
  subDesignation: string;
  linkedInUrl: string;
  imageUrl: string | File;
  sequence: number;
}

export interface IResOurTeamMember extends IOurTeamMember {
  name: string;
  isActive: boolean;
}

export interface IToogle {
  input: {
    id: string | undefined;
    status: boolean | string;
  };
}

export interface IReqOurTeamMember {
  input: IOurTeamMember;
}

export interface IReqUpSertOurTeam {
  input: IOurTeam;
}
export interface IReqOurProcess {
  input: IOurProcess;
}
export interface IResOurProcessDescription {
  getOurProcessDescription: IUpSertOurProcess;
}
export interface IReqOurProcessDescription {
  input: IUpSertOurProcess;
}

export interface IInputAboutMain {
  input: IAboutMain;
}

export interface IReqAboutMain {
  input: IReqAboutMain;
}

export interface IResGetAboutMain {
  getAbout: IAboutMain;
}

export interface IResGetOurTeam {
  getOurTeam: IOurTeam;
}

export interface IResGetListOurTeamMembers {
  listOurTeamMembers: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    ourTeamMembers: IResOurTeamMember[];
  };
}
export interface IResGetListOurProcess {
  listOurProcesses: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    ourProcesses: IOurProcess[];
  };
}

export interface IResGetOurTeamMember {
  getOurTeamMemberById: IResOurTeamMember;
}
export interface IResGetOurProcessById {
  getOurProcessById: IOurProcess;
}

export interface IDeleteData<T> {
  id: T;
}

// export interface ITabIndex {
//   [key: number]: string;
// }
