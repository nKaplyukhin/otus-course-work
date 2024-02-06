import { PAGE_SIZE_STEP } from "constansts/other";
import { useCallback, useState } from "react";


export function usePageSize() {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_STEP);

  const updatePage = useCallback((total: number | undefined) => {

    if (total && total <= pageSize) return;
    setPageSize((p) => p + PAGE_SIZE_STEP);
  }, [pageSize]);

  return { pageSize, updatePage }
}