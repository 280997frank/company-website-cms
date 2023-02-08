import React, {
  FC,
  MouseEventHandler,
  ChangeEventHandler,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  VisuallyHidden,
  IconButton,
  Image,
  Box,
  Icon,
  Text,
  Center,
} from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { GrDrag } from "react-icons/gr";
import { useField } from "formik";

import InputContainer from "@/components/Atoms/InputContainer";

import { useSortable } from "@/hooks/draggable";

import type { InputContainerProps } from "@/components/Atoms/InputContainer";

interface MediaUploadProps extends Omit<InputContainerProps, "children"> {
  name: string;
  type: "video" | "image" | "all" | "application/pdf" | ".glb";
  accept?: string; // "video" | "image" | "all" | "application/pdf" | ".glb";
  mimeType?: string;
  ratio?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  placeholder?: string;
  isDraggable?: boolean;
  onItemSwitch?: (itemId: string, targetIndex: number) => Promise<void>;
  itemIndex?: number;
}

const MediaUpload: FC<MediaUploadProps> = ({
  name,
  type,
  label = "",
  ratio = 56.25,
  mimeType = "",
  accept = "all",
  onChange = () => {},
  onRemove,
  width = "unset",
  height = "unset",
  //
  id,
  tooltip = "",
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  isDraggable,
  onItemSwitch,
  itemIndex = 0,
}) => {
  const [{ value }, , { setValue, setTouched }] = useField<string | File>(name);
  const [fileUrl, setFileUrl] = useState("");
  const [showImagePreview, setImagePreviewVisible] = useState(
    type === "image" || type === "all"
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, handlerId } = useSortable<HTMLDivElement>({
    accept: "MediaUpload",
    onDrop: onItemSwitch,
    itemId: id,
    itemIndex,
  });

  const removeItem = useCallback(() => {
    URL.revokeObjectURL(fileUrl);
    setFileUrl("");
    setValue("");
  }, [fileUrl, setValue]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  useEffect(() => {
    if (value instanceof File) {
      setFileUrl(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <InputContainer
      nodeRef={isDraggable ? ref : undefined}
      handlerId={handlerId}
      id={id}
      name={name}
      label={label}
      tooltip={tooltip}
      description={description}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      leftElement={
        isDraggable && (
          <Icon
            as={GrDrag}
            h={4}
            _hover={{ cursor: "grab" }}
            sx={{ "& path": { stroke: "white" } }}
          />
        )
      }
    >
      <Box
        paddingTop={`${ratio}%`}
        mt={2}
        borderRadius="none"
        position="relative"
        border="1px solid white"
        height={height}
        width={width}
      >
        <Box
          as="label"
          height="100%"
          w="100%"
          position="absolute"
          display="block"
          cursor="pointer"
          top="0"
        >
          <Center h="100%" flexDir="column">
            {type === ".glb" && (value instanceof File ? value : fileUrl) ? (
              <Text color="white" fontWeight="bold">
                {value instanceof File ? value.name : fileUrl}
              </Text>
            ) : (
              <>
                <Icon as={MdFileUpload} color="white" fontSize="2.5rem" />
                {placeholder ? (
                  <Text
                    color="white"
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontFamily="'Mark Pro'"
                  >
                    {placeholder}
                  </Text>
                ) : (
                  <Text
                    color="white"
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontFamily="'Mark Pro'"
                  >
                    Upload{" "}
                    {accept === "all" ? "Image/Video" : accept.split("/")[0]}
                  </Text>
                )}
              </>
            )}
          </Center>
          {showImagePreview && (value instanceof File ? fileUrl : value) && (
            <Image
              src={value instanceof File ? fileUrl : value}
              alt={value instanceof File ? value.name : ""}
              position="absolute"
              bgColor="white"
              top="0"
              width="100%"
              height="100%"
              fit="contain"
              align="top"
              onError={() => {
                setImagePreviewVisible(false);
              }}
            />
          )}
          {type === "video" && (value instanceof File ? fileUrl : value) && (
            <video
              ref={videoRef}
              preload="metadata"
              width="960"
              height="540"
              controls
              muted
              autoPlay
              loop
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
              }}
              /* onError={() => {
                if (videoRef.current) {
                  videoRef.current.style.display = "none";
                }
              }} */
            >
              <source
                src={value instanceof File ? fileUrl : value}
                type={value instanceof File ? value.type : mimeType}
              />
            </video>
          )}
          <VisuallyHidden>
            <input
              type="file"
              value=""
              accept={accept === "all" ? "image/*,video/*" : `${accept}`}
              onChange={(e) => {
                if (
                  e.currentTarget.files instanceof window.FileList &&
                  e.currentTarget.files.length > 0
                ) {
                  URL.revokeObjectURL(fileUrl);
                  setValue(e.currentTarget.files[0]);
                  const objectUrl = URL.createObjectURL(
                    e.currentTarget.files[0]
                  );
                  setFileUrl(objectUrl);
                  setTouched(true);
                }

                onChange(e);
              }}
            />
          </VisuallyHidden>
        </Box>
        <IconButton
          aria-label="Remove image"
          icon={<IoMdTrash />}
          variant="ghost"
          bgColor="transparent"
          color="white"
          borderRadius="50%"
          position="absolute"
          top="4%"
          right="2.5%"
          size="sm"
          type="button"
          fontSize="1.4rem"
          onClick={onRemove || removeItem}
        />
      </Box>
    </InputContainer>
  );
};

export default MediaUpload;
