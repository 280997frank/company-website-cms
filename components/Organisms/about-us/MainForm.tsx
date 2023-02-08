import FormInput from "@/components/Molecules/FormInput";
import MediaUpload from "@/components/Molecules/MediaUpload";
import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import InputTextArea from "@/components/Organisms/InputTextArea";
import { Form } from "formik";

function MainForm() {
  return (
    <Form>
      <Flex flexDir="column" gap="4vh">
        <FormInput
          label="TITLE"
          id="title"
          name="title"
          tooltip="input title"
          placeholder="Regular Text input value goes here"
        />
        <InputTextArea
          tooltip="this is description"
          name="description"
          label="DESCRIPTION"
        />
        <HStack>
          <MediaUpload
            name="imageUrl"
            id="imageUrl"
            label="HERO IMAGE"
            type="all"
            tooltip="this is hero image"
          />
          <MediaUpload
            name="videoUrl"
            id="videoUrl"
            label="HERO VIDEO"
            type="all"
            tooltip="this is hero video"
          />
        </HStack>
      </Flex>
    </Form>
  );
}

export default MainForm;
