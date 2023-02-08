import {
  Breadcrumb as BreadcrumbChakra,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";

type TBreadcrumb = React.FC<{
  list: {
    label: string;
    link?: string;
  }[];
}>;

const Breadcrumb: TBreadcrumb = ({ list }) => {
  return (
    <BreadcrumbChakra
      spacing="5px"
      color="White"
      marginBottom="8 !important"
      separator={<BsChevronRight color="white" />}
    >
      {list.map((data, index) => (
        <BreadcrumbItem key={index}>
          {data.link ? (
            <BreadcrumbLink href={data.link} textDecoration="underline">
              {data.label}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbItem>
              <Text>{data.label}</Text>
            </BreadcrumbItem>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbChakra>
  );
};

export default Breadcrumb;
