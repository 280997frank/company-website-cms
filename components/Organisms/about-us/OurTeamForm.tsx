import FormInput from "@/components/Molecules/FormInput";
import React from "react";
// import InputTextArea from "@/components/Organisms/InputTextArea";
import { Flex } from "@chakra-ui/react";
import RichTextInput from "@/components/Molecules/RichTextInput";

function OurTeamForm() {
  return (
    <Flex flexDir="column" gap="4vh">
      <FormInput
        label="TITLE"
        id="title"
        name="title"
        placeholder="Regular Text input value goes here"
        tooltip="this is title"
      />
      {/* <InputTextArea
        tooltip="this is description"
        name="description"
        label="DESCRIPTION"
        placeholder="Regular Text input value goes here"
      /> */}
      <RichTextInput
        id="description"
        name="description"
        label="DESCRIPTION"
        tooltip="this is description"
        placeholder="Regular Text input value goes here"
      />
    </Flex>
  );
}

export default OurTeamForm;
