import { useAppSelector } from "store/hooks"
import { selectTokenData } from "store/profileSlice"

export const useToken = () => {
  const token = useAppSelector(selectTokenData)?.token


  return token
}