import React, { FC, useEffect } from "react";
import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";
// import { useRouter } from "next/router";
interface Tprops {
  label: string;
  url: string;
  color: string;
  colorHover: string;
  setColorHover: (color: string) => void;
}
const NavItem: FC<Tprops> = ({
  label,
  url,
  color,
  colorHover,
  setColorHover,
  ...props
}) => {
  // const router = useRouter();
  const isMatch = (url: string, path: string) => {
    // console.log(url, path);
    return new RegExp(`^${url}`, "m").test(path);
  };
  useEffect(() => {
    if (isMatch(url, window.location.pathname)) {
      setColorHover(color);
    }
  }, [color, setColorHover, url]);
  return (
    <NextLink passHref href={url}>
      <Link
        {...props}
        _hover={{
          "&:before": {
            bg: colorHover,
            transition: "all .4s",
          },
          "& > span": {
            transition: "all .4s",
            transform: "translateX(20px)",
            color: "#000",
          },
        }}
        _focus={{ outline: "0" }}
        textDecoration="none"
        pos="relative"
        display="flex"
        alignItems="flex-start"
        userSelect="none"
        fontWeight="bold"
        fontSize="sm"
        minH="45px"
        my=".4rem"
        py=".5rem"
        _before={{
          content: `" "`,
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "6px",
          zIndex: "-1",
          bg: isMatch(url, window.location.pathname) ? color : "none",
        }}
      >
        <Text
          as="span"
          fontSize="1.2rem"
          fontWeight="bold"
          transform={
            isMatch(url, window.location.pathname)
              ? "translateX(20px)"
              : "translateX(0)"
          }
          color={isMatch(url, window.location.pathname) ? "#000" : "white"}
          textTransform="uppercase"
          lineHeight="1"
          // _hover={{
          //   transition: "all .3s",
          //   transform: "translateX(15%)",
          //   fontWeight: "bold",
          // }}
        >
          {label}
        </Text>
      </Link>
    </NextLink>
  );
};

export default NavItem;
