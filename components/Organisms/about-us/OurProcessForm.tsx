import React from "react";
import MediaUpload from "@/components/Molecules/MediaUpload";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
// import InputTextArea from "@/components/Organisms/InputTextArea";
import FormInput from "@/components/Molecules/FormInput";
import { BsChevronCompactRight } from "react-icons/bs";
import RichTextInput from "@/components/Molecules/RichTextInput";

function OurProcessForm() {
  return (
    <>
      <Breadcrumb
        spacing="8px"
        my="3.5vh"
        color="white"
        separator={<BsChevronCompactRight color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink fontWeight="bold" href="/our-story/our-process">
            OUR PROCESS LIST
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Box as="span">Title </Box>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex flexDir="column" gap="4vh">
        <Flex flexDir="column" gap="4vh">
          <FormInput
            label="TITLE"
            id="title"
            name="title"
            placeholder="Regular Text input value goes here"
            tooltip="this is title"
          />
          <FormInput
            label="SUBTITLE"
            id="subtitle"
            name="subtitle"
            placeholder="Regular Text input value goes here"
            tooltip="this is subtitle"
          />
          <FormInput
            label="SEQUENCE"
            id="sequence"
            name="sequence"
            placeholder="Regular Text input value goes here"
            tooltip="this is sequence"
          />
        </Flex>
        <Flex mt="10px" gap="1vw" flexDir="row" justifyContent="space-between">
          {/* <InputTextArea
            placeholder="Regular Text input value goes here"
            tooltip="this is description"
            name="description"
            label="DESCRIPTION"
          /> */}
          <RichTextInput
            id="description"
            name="description"
            label="DESCRIPTION"
            tooltip="this is description"
            placeholder="Regular Text input value goes here"
          />
          <MediaUpload
            height="90%"
            name="imageUrl"
            id="imageUrl"
            label="IMAGE"
            type="image"
            tooltip="this is image"
          />
        </Flex>
      </Flex>
    </>
  );
}

export default OurProcessForm;
