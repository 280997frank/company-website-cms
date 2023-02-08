import { LoginPayload, LoginResponse } from "@/types/auth";
import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const MUTATION_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

interface ResponseLoginMutation {
  login: LoginResponse;
}

export const useLoginSubmit = () => {
  const toast = useToast();
  const [loginSubmit, { data: responseLogin, loading }] = useMutation<
    ResponseLoginMutation,
    LoginPayload
  >(MUTATION_LOGIN, {
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
    loginSubmit,
    responseLogin,
    loading,
  };
};
