// import React from "react";
// import { Stack } from "@mui/material";

// type Props = {
//   children: string | JSX.Element | JSX.Element[];
//   direction: string;
// };

// const FlexWrapper = ({ children, direction }: Props) => {
//   return (
//     <Stack
//       display={"flex"}
//       flexDirection={direction === "row" ? direction : "column"}
//       justifyContent={"center"}
//       alignItems="center"
//     >
//       {children}
//     </Stack>
//   );
// };

// export default FlexWrapper;

import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const FlexWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});
