import { useAppSelector } from "store/hooks"
import { selectTokenData } from "store/tokenSlice"

export const useToken = () => {
  const token = useAppSelector(selectTokenData)?.token

  return token
}