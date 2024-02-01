import { useCallback, useState } from "react";

const PAGE_SIZE_STEP = 5;

export function usePageSize() {
  const [pageSize, setPageSize] = useState(5);

  const updatePage = useCallback((total: number | undefined) => {

    if (total && total <= pageSize) return;
    setPageSize((p) => p + PAGE_SIZE_STEP);
  }, [pageSize]);

  return { pageSize, updatePage }
}