import React from "react";
import { Box, Heading, SimpleGrid, Center, Text } from "@chakra-ui/react";
import { useField, FieldArray } from "formik";
import { nanoid } from "nanoid/non-secure";

import MediaUpload from "@/components/Molecules/MediaUpload";
import AddNewButton from "@/components/Atoms/AddNewButton";

import type { AddNewButtonProps } from "@/components/Atoms/AddNewButton";

interface UploadItem {
  id: string;
  url: string;
}

interface MediaUploadGalleryProps {
  label: string;
  addNewButton: AddNewButtonProps;
  name: string;
}

export default function MediaUploadGallery({
  label,
  addNewButton,
  name,
}: MediaUploadGalleryProps) {
  const [{ value }, , { setValue }] = useField<UploadItem[]>(name);
  const onItemSwitch = async (itemId: string, targetIndex: number) => {
    console.log(`Item ${itemId} is moved to row #${targetIndex}`);
    const sourceIndex = value.findIndex((item) => item.id === itemId);
    const newValue = [...value];
    const [movedItem] = newValue.splice(sourceIndex, 1);
    newValue.splice(targetIndex, 0, movedItem);
    setValue(newValue);
  };

  return (
    <FieldArray name={name}>
      {({ push, remove }) => {
        return (
          <Box as="section" role="group">
            <Heading
              fontSize="2xl"
              color="white"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              {label}
              <AddNewButton
                {...addNewButton}
                onClick={() => {
                  push({ id: nanoid(), url: "" });
                }}
              />
            </Heading>
            {value.length ? (
              <SimpleGrid
                border="1px solid white"
                columns={4}
                spacing={4}
                p={6}
              >
                {value.map((val, index) => {
                  return (
                    <MediaUpload
                      key={val.id}
                      name={`${name}.${index}.url`}
                      type="image"
                      label={`IMAGE #${index + 1}`}
                      id={`${name}.${index}`}
                      onRemove={() => remove(index)}
                      onItemSwitch={onItemSwitch}
                      itemIndex={index}
                      isDraggable
                    />
                  );
                })}
              </SimpleGrid>
            ) : (
              <Center h="10rem" border="1px solid white">
                <Text color="white" fontFamily="Mark Pro">
                  No Data
                </Text>
              </Center>
            )}
          </Box>
        );
      }}
    </FieldArray>
  );
}
