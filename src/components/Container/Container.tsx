import { Box, styled } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";

const StyledBox = styled(Box)`
  max-width: 1200px;
  margin: auto;
`;

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};
