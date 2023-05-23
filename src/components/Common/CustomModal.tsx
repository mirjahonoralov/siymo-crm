import React from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  outline: "none",
};

type T = {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  overflow?: string;
  customStyled?: boolean;
};

const CommonModal: React.FC<T> = ({
  open,
  handleClose,
  children,
  overflow,
  customStyled,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        maxHeight={customStyled ? "none" : "600px"}
        overflow={overflow ? overflow : "auto"}
        sx={style}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CommonModal;
