import React, { memo } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { IProfileData } from 'interfaces/profile';

interface IProps {
  onChangeDataClick: (e: React.SyntheticEvent<HTMLElement, Event>) => void;
  onChangePasswordClick: (e: React.SyntheticEvent<HTMLElement, Event>) => void;
  data: IProfileData;
}
export const ProfileCard = memo(({ onChangeDataClick, onChangePasswordClick, data }: IProps) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="h5">
        Имя пользователя: {data.name}
      </Typography>
      <Typography variant="h5"> Эл. почта: {data.email}</Typography>
    </CardContent>
    <CardActions>
      <Button onClick={onChangeDataClick} variant="contained" size="small">
        Изменить данные
      </Button>
      <Button onClick={onChangePasswordClick} variant="contained" color="secondary" size="small">
        Изменить пароль
      </Button>
    </CardActions>
  </Card>
));

ProfileCard.displayName = 'ProfileCard';
