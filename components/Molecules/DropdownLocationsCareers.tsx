import { FC, useCallback, useState } from "react";
import { EOrderType, ESortType } from "@/types/careeers";
import FormSingleDropdown from "@/components/Molecules/FormSingleDropdown";
import { useListLocationz } from "@/hooks/careers";
interface Tprops {
  isDisabled: boolean;
  name: string;
  label: string;
  id: string;
  tooltip: string;
}

const DropdownLocationsCareers: FC<Tprops> = ({
  id,
  tooltip,
  isDisabled,
  name,
  label,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    keyword: "",
  });
  const { fetchListLocations } = useListLocationz({
    input: {
      page: currentPage,
      limit: 10,
      search: search,
      order: {
        orderBy: EOrderType.CITY_NAME,
        sortBy: ESortType.ASC,
      },
    },
  });
  const isHasMore = (data: any) => {
    if (data.totalPage > data.page) {
      return true;
    } else {
      return false;
    }
  };

  const reMapData = (data: any = []) => {
    return data.map((item: any) => ({ label: item.cityName, value: item.id }));
  };
  const loadOptionsLocations = useCallback(
    async (search: string, loadedOptions: any, { page }: any) => {
      console.log("loadedOptions", loadedOptions);
      setSearch({ keyword: search });
      setCurrentPage(page);
      const req = await fetchListLocations();
      const dataPro = reMapData(req.data?.listLocations.locations);
      return {
        options: dataPro,
        hasMore: isHasMore(req.data?.listLocations),
        additional: {
          page: page + 1,
        },
      };
    },
    [fetchListLocations]
  );

  return (
    <>
      <FormSingleDropdown
        id={id}
        tooltip={tooltip}
        label={label}
        name={name}
        isDisabled={isDisabled}
        loadOptions={loadOptionsLocations}
      />
    </>
  );
};

export default DropdownLocationsCareers;
