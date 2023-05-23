import { KeyboardBackspace } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Back = styled.div<{ top?: string; left?: string }>`
  top: ${({ top }) => (top ? top : "-50px")};
  left: ${({ left }) => (left ? left : "130px")};
  width: 120px;
  position: absolute;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  cursor: pointer;
  color: #000;
`;

type T = {
  to: string;
  top?: string;
  left?: string;
};

const ToBack: React.FC<T> = ({ left, to, top }) => {
  return (
    <Link to={to}>
      <Back left={left} top={top}>
        <KeyboardBackspace /> Назад
      </Back>
    </Link>
  );
};

export default ToBack;
