import React, { useState } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UseFormRegisterReturn } from 'react-hook-form';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface IProps {
  register: UseFormRegisterReturn<string>;
  defaultValue: string | undefined;
}

export const InputFile = ({ register, defaultValue }: IProps) => {
  const [text, setText] = useState(defaultValue || '');
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const [file] = e.target.files || [];

    if (file) {
      setText(file.name);
    }
  };

  return (
    <StyledBox>
      <Typography>{text}</Typography>
      <Button component="label" variant="contained" color="secondary" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput {...register} onChange={handleChange} type="file" />
      </Button>
    </StyledBox>
  );
};
