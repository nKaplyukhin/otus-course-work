import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, styled } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { createPortal } from 'react-dom';

const StyledButton = styled(IconButton)`
  position: fixed;
  right: 50px;
  bottom: 50px;
  font-size: 50px;
`;

const SHOW_BUTTON_SCROLL_SIZE = 500;

export const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY > SHOW_BUTTON_SCROLL_SIZE) {
        setIsVisible(true);
        return;
      }
      setIsVisible(false);
    };
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return createPortal(
    isVisible && (
      <Tooltip title="Наверх" arrow>
        <StyledButton size="large" onClick={handleClick}>
          <ArrowUpwardIcon style={{ fontSize: 40 }} />
        </StyledButton>
      </Tooltip>
    ),
    document.body
  );
};
