import { useToken } from "hooks/useToken";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useGetOperationsQuery } from "store/rtk/operations";
import { useSorting } from "hooks/useSorting";
import { PAGE_SIZE_STEP } from "constansts/other";
import { CATEGORY_PARAM, FILTER_ALL } from "../constants";

export const useFilteredData = () => {
  const [sorting, changeSorting] = useSorting();
  const token = useToken();
  const [searchParams] = useSearchParams();
  const category = useMemo(() => searchParams.get(CATEGORY_PARAM), [searchParams]);

  const { isLoading, data, isSuccess } = useGetOperationsQuery({ token, sorting });
  const [typeSorting, setTypeSorting] = useState(FILTER_ALL);

  const sortingData = data?.data
    .filter((item) => typeSorting === FILTER_ALL || item.type === typeSorting)
    .filter((item) => !category || category === item.category?.id);

  return {
    isLoading,
    isSuccess,
    data: sortingData || [],
    total: data?.pagination.total || PAGE_SIZE_STEP,
    changeSorting,
    setTypeSorting
  }
}