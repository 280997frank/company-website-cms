import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { isNil } from "lodash";
import { useState } from "react";
import {
  TPayload,
  IListLocationsResponse,
  TDataLocations,
  TAddLocationtArgs,
  TAddLocationResponse,
  TEditLocationtArgs,
  TEditLocationResponse,
  TDeleteLocationResponse,
  TDeleteLocationArg,
  PublishLocationResponse,
  PublishLocationtArg,
  TLocationByIdArgs,
  TLocationByIdResponse,
} from "@/types/contactUs";
import { useRouter } from "next/router";

const LIST_LOCATIONS = gql`
  query listLocations($input: ListLocationInput!) {
    listLocations(input: $input) {
      page
      limit
      total
      totalPage
      locations {
        id
        cityName
        email
        isActive
      }
    }
  }
`;
const LOCATION_BY_ID = gql`
  query getLocationById($id: String!) {
    getLocationById(id: $id) {
      id
      email
      cityName
      address
      phoneNumber
      image
      facebook
      instagram
      youtube
      linkedin
      wechat
      whatsapp
      urlMap
      facebookActive
    }
  }
`;

const ADD_LOCATION = gql`
  mutation addLocation($input: AddLocationInput!) {
    addLocation(input: $input) {
      id
      email
      cityName
      address
      phoneNumber
      image
      facebook
      instagram
      youtube
      linkedin
      wechat
      whatsapp
      urlMap
      facebookActive
      instagramActive
      youtubeActive
      linkedinActive
      wechatActive
      whatsappActive
      intercomActive
    }
  }
`;

const EDIT_LOCATION = gql`
  mutation editLocation($input: EditLocationInput!) {
    editLocation(input: $input) {
      id
      email
      cityName
      address
      phoneNumber
      image
      facebook
      instagram
      youtube
      linkedin
      wechat
      whatsapp
      urlMap
      facebookActive
      instagramActive
      youtubeActive
      linkedinActive
      wechatActive
      whatsappActive
      intercomActive
    }
  }
`;

const delete_LOCATION = gql`
  mutation deleteLocation($id: String!) {
    deleteLocation(id: $id) {
      success
    }
  }
`;

const PUBLISH_LOCATION = gql`
  mutation toggleActiveLocation($input: ToggleActiveLocationInput!) {
    toggleActiveLocation(input: $input) {
      id
    }
  }
`;

export const useListLocations = (payload: TPayload) => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataLocations[]>([]);
  const [fetchListLocations, { data, loading }] =
    useLazyQuery<IListLocationsResponse>(LIST_LOCATIONS, {
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
          !isNil(data.listLocations) &&
          !isNil(data.listLocations.locations)
        ) {
          if (payload.input.page === 1) {
            setNewData(data.listLocations.locations);
          } else {
            setNewData((newData) => [
              ...newData,
              ...data.listLocations.locations,
            ]);
          }
        }
      },
    });
  return {
    fetchListLocations,
    responseListLocations: newData,
    totalPageLocations: data?.listLocations.totalPage,
    loading,
  };
};

export const useLocationById = () => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataLocations>();
  const [fetchLocationById, { data, loading }] = useLazyQuery<
    TLocationByIdResponse,
    TLocationByIdArgs
  >(LOCATION_BY_ID, {
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
      if (!isNil(data) && !isNil(data.getLocationById)) {
        setNewData(data.getLocationById);
      }
    },
  });
  return {
    fetchLocationById,
    data,
    newData,
    loading,
  };
};

export const useAddLocation = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchAddLocation, { data, loading }] = useMutation<
    TAddLocationResponse,
    TAddLocationtArgs
  >(ADD_LOCATION, {
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
      router.push("/contact-us");
    },
  });

  return {
    fetchAddLocation,
    data,
    loading,
  };
};

export const useEditLocation = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchEditLocation, { data, loading }] = useMutation<
    TEditLocationResponse,
    TEditLocationtArgs
  >(EDIT_LOCATION, {
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
      router.push("/contact-us");
    },
  });

  return {
    fetchEditLocation,
    data,
    loading,
  };
};

//========== DELETE =============
export const useDeleteLocation = (payload: TPayload) => {
  const { fetchListLocations } = useListLocations(payload);
  const toast = useToast();

  const [fetchDelete, { loading, data }] = useMutation<
    TDeleteLocationResponse,
    TDeleteLocationArg
  >(delete_LOCATION, {
    onCompleted: () => {
      fetchListLocations();
      toast({
        title: "Successfully deleted",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  // useErrorMessage(error);

  return {
    fetchDelete,
    loading,
    data,
  };
};

//========== PUBLISH Location ==========
export const useLocationPublish = (payload: TPayload) => {
  const { fetchListLocations } = useListLocations(payload);
  const toast = useToast();

  const [fetchPublish, { loading, data }] = useMutation<
    PublishLocationResponse,
    PublishLocationtArg
  >(PUBLISH_LOCATION, {
    onCompleted: () => {
      fetchListLocations();
      toast({
        title: "Succesfully updated",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  // useErrorMessage(error);

  return {
    fetchPublish,
    loading,
    data,
  };
};
