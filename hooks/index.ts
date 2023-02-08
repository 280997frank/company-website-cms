import { useEffect } from "react";
import { ApolloError } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

export const useErrorMessage = (error: ApolloError | Error | undefined) => {
  const toast = useToast();

  useEffect(() => {
    const errorToken = ["Failed to verify Token", "Token Expired"];

    if (
      error?.message ==
        `QueryFailedError: ER_WARN_DATA_OUT_OF_RANGE: Out of range value for column 'rank' at row 1` ||
      error?.message ==
        `QueryFailedError: ER_DATA_TOO_LONG: Data too long for column 'timing' at row 1`
    ) {
      toast({
        title: "please ensure you key in the correct value for Timing/Rank",
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    } else if (error?.message === "You are not granted for this access") {
      toast({
        title: "Access required to make changes",
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    } else if (error) {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });

      // handle token error
      if (errorToken.includes(error.message)) {
        // removeAccessToken();
        window.location.href = "/";
      }
    }
    // eslint-disable-next-line
  }, [error, toast]);
};
