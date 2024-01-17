import { Box, Button, ClickAwayListener, css, styled } from '@mui/material';
import React, { FC, PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';

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

const StyledModal = styled(Box)`
  position: absolute;
  max-width: 500px;
  min-height: 40vh;
  width: 100%;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 1px 1px 10px black;
`;

const CloseButton = styled('button')`
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: opacity 0.3s ease-out;
  &:hover {
    opacity: 0.5;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.text};
    left: 50%;
    top: 0px;
    width: 2px;
    bottom: 0;
  }
  &::before {
    transform: translateX(-50%) rotate(-45deg);
  }
  &::after {
    transform: translateX(-50%) rotate(45deg);
  }
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
          <CloseButton onClick={onClose} />
          {children}
        </StyledModal>
      </ClickAwayListener>
    </StyledModalContainer>,
    document.body
  );
};
