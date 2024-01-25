import { useState } from "react";
import { addDefaults } from "utils/other";

export const useModalController = (isOpenDefault: boolean = false) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const handleClose = () => setIsOpen(false);

  const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    addDefaults(e);
    setIsOpen(true);
  };

  return { isOpen, handleOpen, handleClose }
}