import CareerDetailForm from "@/components/Organisms/CareerDetailForm";
import CareerJobTable from "@/components/Organisms/CareerJobTable";
import Layout from "@/components/Templates/Layout";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

const Category: FC = () => {
  const router = useRouter();
  const { category } = router.query;
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
          <CareerDetailForm />
        </Stack>
        {category === "new" ? null : (
          <Stack w="100%" marginTop="3rem !important">
            <CareerJobTable />
          </Stack>
        )}
      </Stack>
    </Layout>
  );
};

export default Category;
