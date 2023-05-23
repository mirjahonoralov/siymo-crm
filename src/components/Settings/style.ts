import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #676767;
  }
`;

export const ExtraWrapper = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
`;

export const SettingsCard = styled.div`
  background: #e0e0e0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.16);
  border-radius: 9px;
  padding: 20px;
  display: flex;
  gap: 28px;
  align-items: center;
  cursor: pointer;

  img {
    width: 35px;
  }

  :hover {
    background: #ff8d3a;
    div {
      color: #fff;
    }

    .img-circle {
      background: #ffa461;
    }
  }
`;

export const Circle = styled.div`
  width: 65px;
  min-width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background: #bdbdbd;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListItem = styled.div<{ border?: string }>`
  padding: 8px 14px 8px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: ${({ border }) => border && border};

  background: #fcfcfc;
  box-shadow: ${({ border }) =>
    !border && "0px 4px 6px -1px rgba(0, 0, 0, 0.1)"};
  border-radius: 6px;
`;

export const CheckboxIcon = styled.div`
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

export const CheckedIcon = styled.div`
  width: 11px;
  height: 11px;
  background: #ff810e;
  border-radius: 2px;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

export const ModalWrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "586px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 29px 31px;
  background: #fcfcfc;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
`;

export const VerticalDivider = styled.div`
  height: 100%;
  width: 2px;
  background-color: #e0e0e0;

  position: absolute;
  left: 50%;
`;
