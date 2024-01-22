import { Box, Button, ClickAwayListener, IconButton, Paper, css, styled } from '@mui/material';
import React, { FC, PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

const active = css`
  opacity: 1;
  pointer-events: auto;
  z-index: 100;
`;

interface IStyledModalContainerProps {
  active?: typeof active;
}

const StyledModalContainer = styled(Box)<IStyledModalContainerProps>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-out;
  opacity: 0;
  pointer-events: none;
  ${({ active }) => active};
`;

const StyledModal = styled(Paper)`
  position: absolute;
  max-width: 500px;
  width: 100%;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 1px 1px 10px black;
`;

const StyledButton = styled(IconButton)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

interface IProps {
  visible: boolean;
  onClose: () => void;
}
export const Modal: FC<PropsWithChildren<IProps>> = ({ visible, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  return createPortal(
    <StyledModalContainer active={visible ? active : undefined}>
      <ClickAwayListener onClickAway={onClose}>
        <StyledModal ref={ref}>
          <StyledButton aria-label="delete" onClick={onClose}>
            <CloseIcon />
          </StyledButton>
          {children}
        </StyledModal>
      </ClickAwayListener>
    </StyledModalContainer>,
    document.body
  );
};
