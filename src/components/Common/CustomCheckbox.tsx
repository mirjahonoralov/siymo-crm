import React from "react";
import { Checkbox } from "@mui/material";
import styled from "styled-components";

const CheckboxIcon = styled.div`
  width: 17px;
  height: 17px;
  background: #e0e0e0;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  transform: matrix(1, 0, 0, -1, 0, 0);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckedIcon = styled.div`
  width: 11px;
  height: 11px;
  background: #ff810e;
  border-radius: 2px;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

type T = {
  id: number;
  selectedItems: number[];
  onClick: () => void;
  style?: any;
};

const CustomCheckbox: React.FC<T> = ({ selectedItems, onClick, id, style }) => {
  return (
    <Checkbox
      sx={style}
      checked={selectedItems.includes(id!)}
      icon={<CheckboxIcon />}
      // @ts-ignore
      onClick={onClick}
      checkedIcon={
        <CheckboxIcon>
          <CheckedIcon />
        </CheckboxIcon>
      }
    />
  );
};

export default CustomCheckbox;
