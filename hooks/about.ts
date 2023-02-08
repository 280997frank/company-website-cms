import {
  gql,
  useLazyQuery,
  useMutation,
  // useMutation
} from "@apollo/client";
import { useToast } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import {
  IAboutMain,
  IOurTeam,
  IInputAboutMain,
  IReqOurTeamMember,
  IReqUpSertOurTeam,
  IResGetAboutMain,
  IResGetOurTeam,
  IResGetOurTeamMember,
  IResGetListOurTeamMembers,
  IToogle,
  IResOurTeamMember,
  IUpSertOurProcess,
  IResOurProcessDescription,
  IReqOurProcessDescription,
  IResGetListOurProcess,
  IReqOurProcess,
  IResGetOurProcessById,
  IOurProcess,
  IDeleteData,
} from "@/types/about";

const GET_ABOUT = gql`
  query getAbout {
    getAbout {
      id
      title
      description
      imageUrl
      videoUrl
    }
  }
`;

const GET_ABOUT_OURTEAM = gql`
  query getOurTeam {
    getOurTeam {
      id
      title
      description
    }
  }
`;

const GET_OUR_PROCESS_DESC = gql`
  query getOurProcessDescription {
    getOurProcessDescription {
      id
      description
    }
  }
`;

const GET_OUR_PROCESS_LIST = gql`
  query listOurProcesses($input: ListOurProcessInput!) {
    listOurProcesses(input: $input) {
      page
      limit
      total
      totalPage
      ourProcesses {
        id
        title
        subtitle
        imageUrl
        description
        isActive
        sequence
      }
    }
  }
`;

const GET_OUR_TEAM_MEMBER = gql`
  query listOurTeamMembers($input: ListOurTeamMemberInput!) {
    listOurTeamMembers(input: $input) {
      page
      limit
      total
      totalPage
      ourTeamMembers {
        id
        name
        designation
        linkedInUrl
        subDesignation
        imageUrl
        sequence
        isActive
      }
    }
  }
`;

const TOGGLE_OUR_TEAM_MEMBER = gql`
  mutation toggleActiveOurTeamMember($input: ToggleActiveOurTeamMemberInput!) {
    toggleActiveOurTeamMember(input: $input) {
      id
      name
      designation
      linkedInUrl
      subDesignation
      imageUrl
      sequence
      isActive
    }
  }
`;

const UP_SERT_ABOUT = gql`
  mutation upSertAbout($input: AboutInput!) {
    upSertAbout(input: $input) {
      id
      title
      description
      imageUrl
      videoUrl
    }
  }
`;

const UP_SERT_OUR_TEAM = gql`
  mutation upSertOurTeam($input: OurTeamInput!) {
    upSertOurTeam(input: $input) {
      id
      title
      description
    }
  }
`;

const UP_SERT_OUR_PROCESS = gql`
  mutation saveOurProcessDescription($input: SaveOurProcessDescriptionInput!) {
    saveOurProcessDescription(input: $input) {
      id
      description
    }
  }
`;

const ADD_OUR_PROCESS = gql`
  mutation addOurProcess($input: AddOurProcessInput!) {
    addOurProcess(input: $input) {
      id
      title
      subtitle
      imageUrl
      description
      isActive
      sequence
    }
  }
`;
const GET_OUR_PROCESS_BY_ID = gql`
  query getOurProcessById($id: Int!) {
    getOurProcessById(id: $id) {
      id
      title
      subtitle
      imageUrl
      description
      isActive
      sequence
    }
  }
`;

const UPDATE_OUR_PROCESS = gql`
  mutation editOurProcess($input: EditOurProcessInput!) {
    editOurProcess(input: $input) {
      id
      title
      subtitle
      imageUrl
      description
      isActive
      sequence
    }
  }
`;

const TOGGLE_OUR_PROCESS = gql`
  mutation toggleActiveOurProcess($input: ToggleActiveOurProcessInput!) {
    toggleActiveOurProcess(input: $input) {
      id
      title
      subtitle
      imageUrl
      description
      isActive
      sequence
    }
  }
`;

const DELETE_OUR_PROCESS = gql`
  mutation deleteOurProcess($id: Int!) {
    deleteOurProcess(id: $id) {
      success
    }
  }
`;

const ADD_OUR_TEAM = gql`
  mutation addOurTeamMember($input: AddOurTeamMemberInput!) {
    addOurTeamMember(input: $input) {
      id
      name
      designation
      linkedInUrl
      subDesignation
      imageUrl
      sequence
      isActive
    }
  }
`;

const GET_OUR_TEAM_MEMBER_BY_ID = gql`
  query getOurTeamMemberById($id: String!) {
    getOurTeamMemberById(id: $id) {
      id
      name
      designation
      linkedInUrl
      subDesignation
      imageUrl
      sequence
      isActive
    }
  }
`;

const UPDATE_OUR_TEAM = gql`
  mutation editOurTeamMember($input: EditOurTeamMemberInput!) {
    editOurTeamMember(input: $input) {
      id
      name
      designation
      linkedInUrl
      subDesignation
      imageUrl
      sequence
      isActive
    }
  }
`;

const DELETE_OUR_TEAM = gql`
  mutation deleteOurTeamMember($id: String!) {
    deleteOurTeamMember(id: $id) {
      success
    }
  }
`;

export const useGetAbout = () => {
  const toast = useToast();

  const [fetchData, { data, loading }] = useLazyQuery<IResGetAboutMain>(
    GET_ABOUT,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    }
  );

  return {
    data,
    fetchData,
    loading,
  };
};

export const useGetOurTeam = () => {
  const toast = useToast();

  const [fetchAboutOurTeam, { data, loading }] = useLazyQuery<IResGetOurTeam>(
    GET_ABOUT_OURTEAM,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    }
  );

  return {
    data,
    fetchAboutOurTeam,
    loading,
  };
};

export const useUpSertAbout = () => {
  const toast = useToast();

  const [submitMainForm, { loading }] = useMutation<
    IAboutMain,
    IInputAboutMain
  >(UP_SERT_ABOUT, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    submitMainForm,
    loading,
  };
};

export const useUpSertOurTeam = () => {
  const toast = useToast();

  const [upSertOurTeamForm, { loading }] = useMutation<
    IOurTeam,
    IReqUpSertOurTeam
  >(UP_SERT_OUR_TEAM, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    upSertOurTeamForm,
    loading,
  };
};

export const useGetOurProcessDesc = () => {
  const toast = useToast();

  const [fetchData, { data, loading }] =
    useLazyQuery<IResOurProcessDescription>(GET_OUR_PROCESS_DESC, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    data,
    fetchData,
    loading,
  };
};

export const useUpSertOurProcess = () => {
  const toast = useToast();

  const [upSertOurProcessForm, { loading }] = useMutation<
    IUpSertOurProcess,
    IReqOurProcessDescription
  >(UP_SERT_OUR_PROCESS, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    upSertOurProcessForm,
    loading,
  };
};

export const useGetOurProcessList = () => {
  const toast = useToast();

  const [fethOurProcessList, { data, loading }] =
    useLazyQuery<IResGetListOurProcess>(GET_OUR_PROCESS_LIST, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    data,
    fethOurProcessList,
    loading,
  };
};

export const useAddOurProcess = () => {
  const toast = useToast();

  const [submitOurProcess, { loading }] = useMutation<any, IReqOurProcess>(
    ADD_OUR_PROCESS,
    {
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
      onCompleted: () => {
        toast({
          title: "Saved !",
          position: "bottom",
          isClosable: true,
          status: "success",
        });
      },
    }
  );

  return {
    submitOurProcess,
    loading,
  };
};

export const useGetOurProcessById = () => {
  const toast = useToast();

  const [fetchOurProcessById, { data, loading }] =
    useLazyQuery<IResGetOurProcessById>(GET_OUR_PROCESS_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    fetchOurProcessById,
    data,
    loading,
  };
};

export const useUpdateOurProcess = () => {
  const toast = useToast();

  const [updateOurProcess, { loading }] = useMutation<
    IOurProcess,
    IReqOurProcess
  >(UPDATE_OUR_PROCESS, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    updateOurProcess,
    loading,
  };
};

export const useToggleOurProcess = () => {
  const toast = useToast();

  const [toggleOurProcess, { loading }] = useMutation<IOurProcess, IToogle>(
    TOGGLE_OUR_PROCESS,
    {
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
      onCompleted: () => {
        toast({
          title: "Success !",
          position: "bottom",
          isClosable: true,
          status: "success",
        });
      },
    }
  );

  return {
    toggleOurProcess,
    loading,
  };
};

export const useDeleteOurProcess = () => {
  const toast = useToast();

  const [deleteOurProcess, { loading }] = useMutation<any, IDeleteData<number>>(
    DELETE_OUR_PROCESS,
    {
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
      onCompleted: () => {
        toast({
          title: "Success !",
          position: "bottom",
          isClosable: true,
          status: "success",
        });
      },
    }
  );

  return {
    deleteOurProcess,
    loading,
  };
};

export const useGetOurTeamMember = () => {
  const toast = useToast();

  const [fetchOurTeamMember, { data, loading }] =
    useLazyQuery<IResGetListOurTeamMembers>(GET_OUR_TEAM_MEMBER, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    data,
    fetchOurTeamMember,
    loading,
  };
};

export const useToggleOurTeam = () => {
  const toast = useToast();

  const [toggleOurMember, { loading }] = useMutation<
    IResOurTeamMember,
    IToogle
  >(TOGGLE_OUR_TEAM_MEMBER, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    toggleOurMember,
    loading,
  };
};

export const useAddOurTeam = () => {
  const toast = useToast();

  const [submitAddOurTeam, { loading }] = useMutation<
    IResOurTeamMember,
    IReqOurTeamMember
  >(ADD_OUR_TEAM, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    submitAddOurTeam,
    loading,
  };
};

export const useGetOurTeamMemberById = () => {
  const toast = useToast();

  const [fetchOurTeamMemberById, { data, loading }] =
    useLazyQuery<IResGetOurTeamMember>(GET_OUR_TEAM_MEMBER_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  return {
    data,
    fetchOurTeamMemberById,
    loading,
  };
};

export const useUpdateOurTeamMember = () => {
  const toast = useToast();

  const [updateOurTeamMember, { loading }] = useMutation<
    IResOurTeamMember,
    IReqOurTeamMember
  >(UPDATE_OUR_TEAM, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Saved !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    updateOurTeamMember,
    loading,
  };
};

export const useDeleteOurTeamMember = () => {
  const toast = useToast();

  const [deleteOurTeamMember, { loading }] = useMutation<
    any,
    IDeleteData<string>
  >(DELETE_OUR_TEAM, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    deleteOurTeamMember,
    loading,
  };
};
