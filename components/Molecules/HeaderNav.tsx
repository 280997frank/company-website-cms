import { Box, Heading } from "@chakra-ui/react";
import React, { FC } from "react";
import ButtonCTA from "@/components/Atoms/Button";

interface IHeaderNav {
  title: string;
  isLoading: boolean;
  brandColor?: string;
  submit: () => void;
  reset: () => void;
}

const HeaderNav: FC<IHeaderNav> = (props) => {
  const { title, isLoading, brandColor, reset, submit } = props;
  const DEFAULT_BRAND_COLOR = "brand.aboutUs";
  return (
    <Box
      w="100%"
      my="3.5vh"
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading
        size="2xl"
        color={brandColor || DEFAULT_BRAND_COLOR}
        textTransform="uppercase"
      >
        {title}
      </Heading>
      <Box>
        <ButtonCTA
          onClick={submit}
          bg={brandColor || DEFAULT_BRAND_COLOR}
          borderColor={brandColor || DEFAULT_BRAND_COLOR}
          color="#081029"
          isLoading={isLoading}
        >
          Save Changes
        </ButtonCTA>
        <ButtonCTA
          onClick={reset}
          borderColor={brandColor || DEFAULT_BRAND_COLOR}
        >
          Discard Changes
        </ButtonCTA>
      </Box>
    </Box>
  );
};

export default HeaderNav;
