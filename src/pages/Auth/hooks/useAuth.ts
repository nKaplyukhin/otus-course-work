import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectTokenData } from "store/profileSlice";

export const useAuth = () => {
  const { loading, signupError, signinError } = useAppSelector(selectTokenData);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatchData = useCallback((action: AsyncThunkAction<any, any, AsyncThunkConfig>) => dispatch(action), [dispatch])

  return { loading, signupError, signinError, dispatchData }

}