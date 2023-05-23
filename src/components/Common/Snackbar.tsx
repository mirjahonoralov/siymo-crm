import React, { forwardRef } from "react";
import {
  Snackbar as MuiSnackbar,
  Alert as MuiAlert,
  Stack,
  AlertProps,
} from "@mui/material";
import { closeSnackbar } from "../../store/slices/mainSlice";
import { useDispatch } from "react-redux";

type T = {
  open: boolean;
  status: "success" | "error";
  message: string;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar: React.FC<T> = ({ open, status, message }) => {
  const dispatch = useDispatch();
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <MuiSnackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ width: "300px" }}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity={status!}
          sx={{ width: "300px" }}
        >
          {message}
        </Alert>
      </MuiSnackbar>
    </Stack>
  );
};

export default Snackbar;
