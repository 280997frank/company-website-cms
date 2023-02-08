import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";
import { HiSearch } from "react-icons/hi";

import type { InputProps } from "@chakra-ui/react";

interface DebouncedSearchProps {
  search: (str: string) => Promise<void>;
}

function SearchInput(props: InputProps) {
  return (
    <InputGroup w="auto">
      <InputLeftElement pointerEvents="none">
        <Icon as={HiSearch} />
      </InputLeftElement>
      <Input {...props} type="search" placeholder="SEARCH" />
    </InputGroup>
  );
}

export default function DebouncedSearch({ search }: DebouncedSearchProps) {
  const toast = useToast();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  return (
    <DebounceInput
      minLength={3}
      debounceTimeout={500}
      value={value}
      onChange={async (event) => {
        try {
          setLoading(true);
          await search(event.target.value);
          setValue(event.target.value);
        } catch (error) {
          if (error instanceof Error) {
            toast({
              title: error.message,
              position: "bottom",
              isClosable: true,
              status: "error",
            });
          }
        } finally {
          setLoading(false);
        }
      }}
      fontFamily="Barlow"
      fontWeight="500"
      fontSize="xl"
      element={SearchInput}
      disabled={isLoading}
      border="none"
      _placeholder={{
        color: "white",
      }}
    />
  );
}
