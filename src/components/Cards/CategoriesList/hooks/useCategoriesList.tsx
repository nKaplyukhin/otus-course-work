import { useToken } from 'hooks/useToken';
import { useCallback, useEffect, useState } from 'react';
import { useGetCategoriesQuery } from 'store/rtk/categories';

const PAGE_SIZE_STEP = 5;

export const useCategoriesList = () => {
  const token = useToken();

  const [pageSize, setPageSize] = useState(5);
  const { isLoading, data: opeartionData, isSuccess } = useGetCategoriesQuery({ pageSize, token });
  const [data, setData] = useState<typeof opeartionData>();

  useEffect(() => {
    if (opeartionData) {
      setData(opeartionData);
    }
  }, [opeartionData]);

  const updatePage = useCallback(() => {
    if (data?.pagination && data.pagination.total <= pageSize) return;

    setPageSize((p) => p + PAGE_SIZE_STEP);
  }, [data?.pagination, pageSize]);

  return { isLoading, data, updatePage, isSuccess };
};
