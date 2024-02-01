import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
} from '@mui/material';
import { useToken } from 'hooks/useToken';
import { ESortingField, ESortingType, ISorting } from 'interfaces/sorting';
import React, { FC } from 'react';

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
`;
interface IProps {
  onAddClick: (e: unknown) => void;
  onChangeSorting: (type: keyof ISorting, data: ESortingField | ESortingType) => void;
}
export const FilterBar: FC<IProps> = ({ onAddClick, onChangeSorting }) => {
  const token = useToken();
  return (
    <StyledBox>
      {token && (
        <Button variant="contained" onClick={onAddClick}>
          Добавить
        </Button>
      )}
      <FormControl>
        <FormLabel>Направление сортировки</FormLabel>
        <RadioGroup
          onChange={(e) => onChangeSorting('type', e.target.value as ESortingType)}
          defaultValue={ESortingType.ASC}
        >
          <FormControlLabel value={ESortingType.ASC} control={<Radio />} label="По Возрастанию" />
          <FormControlLabel value={ESortingType.DESC} control={<Radio />} label="По убыванию" />
        </RadioGroup>
      </FormControl>
      <Select
        onChange={(e) => onChangeSorting('field', e.target.value as ESortingField)}
        size="small"
        defaultValue={ESortingField.id}
      >
        {Object.keys(ESortingField).map((key) => (
          <MenuItem key={key} value={key}>
            {ESortingField[key]}
          </MenuItem>
        ))}
      </Select>
    </StyledBox>
  );
};
