import React, { FC, memo } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { IProfileData } from 'interfaces/profile';

interface IProps {
  onChangeClick: (e: React.SyntheticEvent<HTMLElement, Event>) => void;
  onDeleteClick: (e: React.SyntheticEvent<HTMLElement, Event>) => void;
  data: IProfileData;
}
export const ProfileCard = memo(({ onChangeClick, onDeleteClick, data }: IProps) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5">
        Имя пользователя: {data.name}
      </Typography>
      <Typography variant="h5"> Эл. почта: {data.email}</Typography>
    </CardContent>
    <CardActions>
      <Button onClick={onChangeClick} variant="outlined" size="small">
        Изменить данные
      </Button>
      <Button onClick={onDeleteClick} variant="contained" size="small">
        Изменить пароль
      </Button>
    </CardActions>
  </Card>
));

ProfileCard.displayName = 'ProfileCard';
