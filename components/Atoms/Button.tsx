import { Button, Link, ButtonProps } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface IBtn extends ButtonProps {
  url?: string;
  bg?: string;
  color?: string;
}

const ButtonCTA = ({
  url,
  bg = "transparent",
  color = "white",
  children,
  borderColor,
  ...props
}: IBtn) => {
  if (url) {
    return (
      <NextLink href={url} passHref>
        <Link
          border="1px solid"
          borderColor={borderColor}
          borderRadius="0"
          textTransform="uppercase"
          bg={bg}
          fontSize="xl"
          fontWeight="500"
          color={color}
          px={4}
          py={2}
          mx={1}
          _hover={{}}
        >
          {children}
        </Link>
      </NextLink>
    );
  }
  return (
    <Button
      border="1px solid"
      borderColor={borderColor}
      borderRadius="0"
      textTransform="uppercase"
      bg={bg}
      fontSize="xl"
      fontWeight="500"
      px={4}
      mx={1}
      color={color}
      _hover={{}}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonCTA;
