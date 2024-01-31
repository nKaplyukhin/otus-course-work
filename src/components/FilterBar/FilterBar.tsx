import { Box, Button } from '@mui/material';
import React, { FC } from 'react';

interface IProps {
  onAddClick: (e: unknown) => void;
}
export const FilterBar: FC<IProps> = ({ onAddClick }) => (
  <Box sx={{ p: 2 }}>
    <Button variant="contained" onClick={onAddClick}>
      Добавить
    </Button>
  </Box>
);
