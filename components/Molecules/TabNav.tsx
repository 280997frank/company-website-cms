import { Box } from "@chakra-ui/react";
import React from "react";
import ButtonCTA from "@/components/Atoms/Button";

interface ITabNav {
  data: {
    label: string;
    url: string;
    brandColorActive?: string;
    fontColorAtive?: string;
  }[];
}

const TabNav = ({ data }: ITabNav) => {
  return (
    <Box>
      {data.map(({ label, url, brandColorActive, fontColorAtive }, i) => {
        return (
          <ButtonCTA
            key={i}
            bg={brandColorActive}
            color={fontColorAtive}
            url={url}
          >
            {label}
          </ButtonCTA>
        );
      })}
    </Box>
  );
};

export default TabNav;
