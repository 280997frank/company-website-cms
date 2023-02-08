import React, { forwardRef, ForwardedRef } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

function InfoIcon_({ ...rest }, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Box {...rest} ref={ref}>
      <Icon as={AiOutlineInfoCircle} fontSize="1.25rem" />
    </Box>
  );
}

const InfoIcon = forwardRef(InfoIcon_);

export default InfoIcon;
