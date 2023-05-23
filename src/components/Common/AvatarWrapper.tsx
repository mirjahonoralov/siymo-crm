import React from "react";
import styled from "styled-components";

type T = {
  size: string;
  cursor?: boolean;
  url: string;
};

type StyleT = {
  size: string;
  cursor?: boolean;
};

export const AddContactImageWrapper = styled.div<StyleT>`
  width: ${({ size }) => size && size};
  min-width: ${({ size }) => size && size};
  height: ${({ size }) => size && size};
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e4e4e4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: ${({ cursor }) => cursor && "pointer"};
  }
`;

const AvatarWrapper: React.FC<T> = ({ size, cursor, url }) => {
  return (
    <AddContactImageWrapper size={size} cursor={cursor}>
      {url && <img src={url} alt="" />}
    </AddContactImageWrapper>
  );
};

export default AvatarWrapper;
