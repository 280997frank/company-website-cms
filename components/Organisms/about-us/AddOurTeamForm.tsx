import FormInput from "@/components/Molecules/FormInput";
import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
} from "@chakra-ui/react";
import MediaUpload from "@/components/Molecules/MediaUpload";
import { BsChevronCompactRight, BsLinkedin } from "react-icons/bs";

function AddOurTeamForm() {
  return (
    <>
      <Breadcrumb
        spacing="8px"
        my="3.5vh"
        color="white"
        separator={<BsChevronCompactRight color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink fontWeight="bold" href="/our-story/our-team">
            Member List
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Box as="span">Firstname Lastname </Box>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w="100%" flexDir="row" justifyContent="flex-start" gap="20px">
        <Box width="100%">
          <MediaUpload
            name="imageUrl"
            id="imageUrl"
            label="MEMBER IMAGE"
            type="image"
            tooltip="this is image input"
          />
        </Box>
        <Flex width="100%" flexDir="column" gap="4vh">
          <HStack gap="1vw">
            <FormInput
              label="NAME"
              id="firstname"
              name="firstname"
              placeholder="First name goes here"
              tooltip="this is first name"
            />
            <FormInput
              label="&nbsp;"
              id="lastname"
              name="lastname"
              placeholder="Last name goes here"
            />
          </HStack>
          <FormInput
            label="DEPARTEMENT"
            id="departement"
            name="designation"
            placeholder="Regular Text input value goes here"
            tooltip="this is departement"
          />
          <FormInput
            label="ROLE"
            id="role"
            name="subDesignation"
            placeholder="Regular Text input value goes here"
            tooltip="this is role"
          />
          <FormInput
            label="SEQUENCE"
            id="sequence"
            name="sequence"
            type="number"
            placeholder="Regular Text input value goes here"
            tooltip="this is sequence number"
          />
          <FormInput
            label="LINKEDIN URL"
            id="linkedin"
            name="linkedInUrl"
            leftElement={<BsLinkedin />}
            placeholder="Regular Text input value goes here"
            tooltip="this is linkedin url"
          />
        </Flex>
      </Flex>
    </>
  );
}

export default AddOurTeamForm;
