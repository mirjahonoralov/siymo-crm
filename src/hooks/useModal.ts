import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return { open, handleClose, handleOpen };
};

export default useModal;
