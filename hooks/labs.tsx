import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { isNil } from "lodash";
import { useState } from "react";
import {
  TDataLabPost,
  TLabListPayload,
  IListLabPostResponse,
  PublishRndPostArg,
  PublishRndPostResponse,
  TRndCategory,
  IListCategoryResponse,
  TLabPostByIdResponse,
  TLabPostByIdArgs,
} from "@/types/labs";
import { useRouter } from "next/router";

const LIST_LABS_POST = gql`
  query listRndPost($input: ListRndPostInput!) {
    listRndPost(input: $input) {
      page
      limit
      total
      totalPage
      rndPost {
        id
        title
        content
        thumbnail
        synopsis
        isActive
        categoryId
        RndCategory {
          id
          title
        }
      }
    }
  }
`;

const LIST_CATEGORY = gql`
  query listRndCategory($input: ListRndCategoryInput!) {
    listRndCategory(input: $input) {
      page
      limit
      total
      totalPage
      rndCategory {
        id
        title
      }
    }
  }
`;

const ADD_CATEGORY = gql`
  mutation addRndCategory($input: AddRndCategoryInput!) {
    addRndCategory(input: $input) {
      id
      title
    }
  }
`;

const ADD_LABS_POST = gql`
  mutation addRndPost($input: AddRndPostInput!) {
    addRndPost(input: $input) {
      id
      title
      content
      thumbnail
      synopsis
      categoryId
    }
  }
`;
const EDIT_LABS_POST = gql`
  mutation editRndPost($input: EditRndPostInput!) {
    editRndPost(input: $input) {
      id
      title
      content
      thumbnail
      synopsis
      categoryId
    }
  }
`;

const DELETE_LABS_POST = gql`
  mutation deleteRndPost($id: String!) {
    deleteRndPost(id: $id) {
      success
    }
  }
`;

const POST_BY_ID = gql`
  query getRndPostById($id: String!) {
    getRndPostById(id: $id) {
      id
      title
      content
      thumbnail
      synopsis
      RndCategory {
        id
        title
      }
    }
  }
`;

const PUBLISH_LAB = gql`
  mutation toggleActiveRndPost($input: ToggleActiveRndPostInput!) {
    toggleActiveRndPost(input: $input) {
      id
      title
      content
      thumbnail
      synopsis
      categoryId
    }
  }
`;

//========== PUBLISH List ==========
export const useListLabPost = (payload: TLabListPayload) => {
  const toast = useToast();
  const [newData, setNewData] = useState<TDataLabPost[]>([]);
  const [fetchListLab, { data, loading }] = useLazyQuery<IListLabPostResponse>(
    LIST_LABS_POST,
    {
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
          !isNil(data.listRndPost) &&
          !isNil(data.listRndPost.rndPost)
        ) {
          if (payload.input.page === 1) {
            const temp = data.listRndPost.rndPost.map((post: TDataLabPost) => {
              return { ...post, category: post.RndCategory.title };
            });
            setNewData(temp);
          } else {
            setNewData((newData) => [...newData, ...data.listRndPost.rndPost]);
            const temp = newData.map((post: TDataLabPost) => {
              return { ...post, category: post.RndCategory.title };
            });
            setNewData(temp);
          }
        }
      },
    }
  );
  return {
    fetchListLab,
    responseListLab: newData,
    totalPageLab: data?.listRndPost.totalPage,
    loading,
  };
};

//========== CATEGORY List ==========
export const useListCategory = (payload: TLabListPayload) => {
  const toast = useToast();
  const [newData, setNewData] = useState<TRndCategory[]>([]);
  const [fetchListCategory, { data, loading }] =
    useLazyQuery<IListCategoryResponse>(LIST_CATEGORY, {
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
          !isNil(data) &&
          !isNil(data.listRndCategory.rndCategory)
        ) {
          if (payload.input.page === 1) {
            setNewData(data.listRndCategory.rndCategory);
          } else {
            setNewData((newData) => [
              ...newData,
              ...data.listRndCategory.rndCategory,
            ]);
          }
        }
      },
    });
  return {
    fetchListCategory,
    data: newData,
    totalPageLab: data?.listRndCategory.totalPage,
    loading,
  };
};

//========== CATEGORY Create ==========
export const useCreateCategory = () => {
  const toast = useToast();
  const [mutationAddCategory, { data, loading }] = useMutation(ADD_CATEGORY, {
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
    mutationAddCategory,
    data,
    loading,
  };
};

//========== PUBLISH Labs ==========
export const useLabPublish = (payload: TLabListPayload) => {
  const { fetchListLab } = useListLabPost(payload);
  const toast = useToast();

  const [fetchPublish, { loading, data }] = useMutation<
    PublishRndPostResponse,
    PublishRndPostArg
  >(PUBLISH_LAB, {
    onCompleted: () => {
      fetchListLab();
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

//========== ADD POST ==========
export const useAddPostLab = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchAddPost, { data, loading }] = useMutation(ADD_LABS_POST, {
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
      router.push("/labs");
    },
  });

  return {
    fetchAddPost,
    data,
    loading,
  };
};

//========== EDIT POST ==========
export const useEditPostLab = () => {
  const toast = useToast();
  const router = useRouter();
  const [fetchEditPost, { data, loading }] = useMutation(EDIT_LABS_POST, {
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
      router.push("/labs");
    },
  });

  return {
    fetchEditPost,
    data,
    loading,
  };
};

//========== DELETE =============
export const useDeleteLabPost = (payload: TLabListPayload) => {
  const { fetchListLab } = useListLabPost(payload);
  const toast = useToast();

  const [mutationDelete, { loading, data }] = useMutation(DELETE_LABS_POST, {
    onCompleted: () => {
      fetchListLab();
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
    mutationDelete,
    loading,
    data,
  };
};

//========== GET BY ID POST =============
export const usePostById = () => {
  const toast = useToast();
  const [fetchPostById, { data, loading }] = useLazyQuery<
    TLabPostByIdResponse,
    TLabPostByIdArgs
  >(POST_BY_ID, {
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
    fetchPostById,
    data,
    loading,
  };
};
