import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { isNil } from "lodash";
import { useState } from "react";
import {
  TPayload,
  IListClientsResponse,
  TDataClients,
  TAddCLienttArgs,
  TAddClientResponse,
  TEditCLienttArgs,
  TEditClientResponse,
  TDeleteClientResponse,
  TDeleteClientArg,
  PublishClientResponse,
  PublishCLienttArg,
  TClientByIdArgs,
  TClientByIdResponse,
} from "@/types/clients";
import { useRouter } from "next/router";
import { useErrorMessage } from ".";

const LIST_CLIENTS = gql`
  query listClients($input: ListClientInput!) {
    listClients(input: $input) {
      page
      limit
      total
      totalPage
      clients {
        id
        name
        logoUrl
        isActive
      }
    }
  }
`;
const CLIENT_BY_ID = gql`
  query getClientById($id: String!) {
    getClientById(id: $id) {
      id
      name
      logoUrl
      isActive
    }
  }
`;

const ADD_CLIENT = gql`
  mutation addClient($input: AddClientInput!) {
    addClient(input: $input) {
      id
      name
      logoUrl
      isActive
    }
  }
`;

const EDIT_CLIENT = gql`
  mutation editClient($input: EditClientInput!) {
    editClient(input: $input) {
      id
      name
      logoUrl
      isActive
    }
  }
`;

const delete_CLIENT = gql`
  mutation deleteClient($id: String!) {
    deleteClient(id: $id) {
      success
    }
  }
`;

const PUBLISH_CLIENT = gql`
  mutation toggleActiveClient($input: ToggleActiveClientInput!) {
    toggleActiveClient(input: $input) {
      id
      name
      logoUrl
      isActive
    }
  }
`;

export const useListClients = (payload: TPayload) => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataClients[]>([]);
  const [fetchListClient, { data, loading, error }] =
    useLazyQuery<IListClientsResponse>(LIST_CLIENTS, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: payload,
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
      onCompleted: (data) => {
        if (
          !isNil(data) &&
          !isNil(data.listClients) &&
          !isNil(data.listClients.clients)
        ) {
          if (payload.input.page === 1) {
            setNewData(data.listClients.clients);
          } else {
            setNewData((newData) => [...newData, ...data.listClients.clients]);
          }
        }
      },
    });
  useErrorMessage(error);
  return {
    fetchListClient,
    responseListClients: newData,
    totalPageClients: data?.listClients.totalPage,
    loading,
  };
};

export const useClientById = () => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataClients>();
  const [fetchClientById, { data, loading, error }] = useLazyQuery<
    TClientByIdResponse,
    TClientByIdArgs
  >(CLIENT_BY_ID, {
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
    onCompleted: (data) => {
      if (!isNil(data) && !isNil(data.getClientById)) {
        setNewData(data.getClientById);
      }
    },
  });
  useErrorMessage(error);
  return {
    fetchClientById,
    data,
    newData,
    loading,
  };
};

export const useAddClient = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchAddClient, { data, loading, error }] = useMutation<
    TAddClientResponse,
    TAddCLienttArgs
  >(ADD_CLIENT, {
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
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/clients");
    },
  });
  useErrorMessage(error);
  return {
    fetchAddClient,
    data,
    loading,
  };
};

export const useEditClient = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchEditClient, { data, loading, error }] = useMutation<
    TEditClientResponse,
    TEditCLienttArgs
  >(EDIT_CLIENT, {
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
        title: "Success",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/clients");
    },
  });
  useErrorMessage(error);
  return {
    fetchEditClient,
    data,
    loading,
  };
};

//========== DELETE =============
export const useDeleteClient = (payload: TPayload) => {
  const { fetchListClient } = useListClients(payload);
  const toast = useToast();

  const [fetchDelete, { loading, data, error }] = useMutation<
    TDeleteClientResponse,
    TDeleteClientArg
  >(delete_CLIENT, {
    onCompleted: () => {
      fetchListClient();
      toast({
        title: "Successfully deleted",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchDelete,
    loading,
    data,
  };
};

//========== PUBLISH Client ==========
export const useClientPublish = (payload: TPayload) => {
  const { fetchListClient } = useListClients(payload);
  const toast = useToast();

  const [fetchPublish, { loading, data, error }] = useMutation<
    PublishClientResponse,
    PublishCLienttArg
  >(PUBLISH_CLIENT, {
    onCompleted: () => {
      fetchListClient();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  useErrorMessage(error);

  return {
    fetchPublish,
    loading,
    data,
  };
};
