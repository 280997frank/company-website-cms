import CareerJobForm from "@/components/Organisms/CareerJobForm";
import Layout from "@/components/Templates/Layout";
import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";

const Category: FC = () => {
  return (
    <Layout title="JOIN US">
      <Stack
        align="flex-start"
        direction="column"
        width="100%"
        h="100%"
        minH="100vh"
        padding={"10"}
      >
        <Stack w="100%">
          <CareerJobForm />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Category;
