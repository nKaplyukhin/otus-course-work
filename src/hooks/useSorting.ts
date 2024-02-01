import { ESortingField, ESortingType, ISorting } from "interfaces/sorting";
import { useCallback, useState } from "react";

export function useSorting(): [ISorting, (type: keyof ISorting, data: ESortingField | ESortingType) => void] {
  const [sorting, setSorting] = useState<ISorting>({
    field: ESortingField.id,
    type: ESortingType.ASC
  })

  const changeSorting = useCallback((type: keyof ISorting, data: ESortingField | ESortingType) => {
    setSorting(s => ({
      ...s,
      [type]: data
    }))
  }, [])

  return [sorting, changeSorting]
}