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
import React from 'react';

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
`;
interface IProps {
  onAddClick: (e: unknown) => void;
  onChangeSorting: (type: keyof ISorting, data: ESortingField | ESortingType) => void;
  other?: React.JSX.Element;
}

export const FilterBar = ({ onAddClick, onChangeSorting, other }: IProps) => {
  const token = useToken();
  return (
    <StyledBox>
      {token && (
        <Button variant="contained" onClick={onAddClick}>
          Добавить
        </Button>
      )}
      {!!onChangeSorting && (
        <>
          <FormControl>
            <FormLabel>Направление сортировки</FormLabel>
            <RadioGroup onChange={(e) => onChangeSorting('type', e.target.value as ESortingType)} defaultValue="ASC">
              {Object.keys(ESortingType).map((key) => (
                <FormControlLabel key={key} value={key} control={<Radio />} label={ESortingType[key]} />
              ))}
            </RadioGroup>
          </FormControl>
          <Select
            onChange={(e) => onChangeSorting('field', e.target.value as ESortingField)}
            size="small"
            defaultValue="id"
          >
            {Object.keys(ESortingField).map((key) => (
              <MenuItem key={key} value={key}>
                {ESortingField[key]}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {other}
    </StyledBox>
  );
};
