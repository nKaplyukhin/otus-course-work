import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { OperationCard } from 'components/Cards';
import { useGetOperationQuery } from 'store/operations';
import { selectTokenData } from 'store/profileSlice';
import { useAppSelector } from 'store/hooks';

export const Card = () => {
  const { id } = useParams();
  const token = useAppSelector(selectTokenData)?.token;

  const { data, isLoading } = useGetOperationQuery({ id: id!, token });

  console.log(data);

  if (isLoading) return <Typography>Loading...</Typography>;

  return data && <OperationCard operation={data} />;
};
