import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';
import { getChartData } from './helpers';
import { IChartData } from './interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  size?: number;
  data: Array<IChartData>;
}

export const Chart = ({ data, size = 500 }: IProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: size,
        height: size,
      }}
    >
      <Doughnut redraw options={{ maintainAspectRatio: false, color: theme.colors.text }} data={getChartData(data)} />
    </Box>
  );
};
