import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { useGetOperationsQuery } from 'store/rtk/operations';
import { selectTokenData } from 'store/tokenSlice';

const PAGE_SIZE_STEP = 5;

export const useOperationsList = () => {
  const token = useAppSelector(selectTokenData)?.token;
  
  const [pageSize, setPageSize] = useState(5);
  const { isLoading, data: opeartionData } = useGetOperationsQuery({ pageSize, token });
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

  return { isLoading, data, updatePage };
};
