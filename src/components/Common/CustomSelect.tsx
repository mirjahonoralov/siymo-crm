import * as React from "react";
import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type T = {
  values: { name: string; id: number }[];
  width: string;
  onChange?: (event: SelectChangeEvent) => void;
  height?: string;
  value?: string | number | undefined;
  showError?: boolean;
  errorFs?: string;
  errorText?: string;
};

const Error = styled.div<{ errorFs?: string }>`
  color: red;
  margin-top: 5px;
  font-size: ${({ errorFs }) => (errorFs ? errorFs : "16px")};
`;

const CustomSelect: React.FC<T> = ({
  values,
  onChange,
  width,
  height,
  value,
  showError,
  errorFs,
  errorText,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: width }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Name</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(value ?? "")}
          onChange={onChange ? onChange : () => null}
          displayEmpty
          sx={{
            height: height ? height : "27px",
            fs: "14px",
            div: {
              paddingLeft: "9px",
            },
            svg: {
              right: "3px",
            },
            textAlign: "start",
            background: "#fff",
          }}
        >
          <MenuItem disabled value="">
            <em>{t("common.select")}</em>
          </MenuItem>
          {values?.[0] &&
            values?.map((item) => (
              <MenuItem key={item.id} value={String(item.id)}>
                {item.name.length > 30
                  ? item.name.slice(0, 30) + "..."
                  : item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {showError && (
        <Error errorFs={errorFs}>
          *{errorText ? errorText : t("validations.fill")}
        </Error>
      )}
    </Box>
  );
};

export default CustomSelect;
