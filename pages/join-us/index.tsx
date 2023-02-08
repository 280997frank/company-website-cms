import CareerMainForm from "@/components/Organisms/CareerMainForm";
import CareersCategoryTable from "@/components/Organisms/CareersCategoryTable";
import Layout from "@/components/Templates/Layout";
import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";

const Careers: FC = () => {
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
          <CareerMainForm />
        </Stack>
        <Stack w="100%" marginTop="3rem !important">
          <CareersCategoryTable />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Careers;
