import { SyntheticEvent, useCallback, useState } from "react";
import { addDefaults } from "utils/other";

export const useModalController = (isOpenDefault: boolean = false) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleOpen = useCallback((e: SyntheticEvent<HTMLElement, Event>) => {
    addDefaults(e)
    setIsOpen(true);
  }, []);

  return { isOpen, handleOpen, handleClose }
}