import { Box, Button, Image, List, Stack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import logoZodiac from "@/assets/images/ZodiacLogo.png";
import { Menu } from "@/constants/menu";
import NavItem from "../Atoms/NavItem";
import { removeAccessToken } from "@/utils";
const Sidebar: FC = () => {
  const [colorActive, setColorActive] = useState("white");
  return (
    <Box
      as="aside"
      position="fixed"
      h="full"
      w="250px"
      overflow="auto"
      display="flex"
      flexDirection="column"
      p="6"
      bgColor="#081029"
    >
      <Image
        src={logoZodiac.src}
        alt="NARS"
        w="80%"
        fontSize="5xl"
        fontWeight="bold"
        maxW="full"
        htmlHeight={102}
        htmlWidth={240}
      />
      <Stack justifyContent="center" flex="1" overflow="hidden">
        <List>
          {Menu.map((item, index: number) => {
            return (
              <NavItem
                key={index}
                colorHover={colorActive}
                setColorHover={setColorActive}
                {...item}
              />
            );
          })}
        </List>
      </Stack>

      <Box display="flex" alignItems="flex-end" marginTop="10">
        <Button
          onClick={() => {
            removeAccessToken();
            window.location.href = "/";
          }}
          bgColor="transparent !important"
          padding="0"
          fontSize="2xl"
          fontWeight="bold"
          color="white"
          textTransform="uppercase"
          border="none"
          _hover={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          LOGOUT
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
