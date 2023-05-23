import styled from "styled-components";

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 20%;
`;

export const Accordions = styled.div`
  height: 83%;
  /* height: calc(100vh - 330px); */
  overflow: auto;
  padding-right: 10px;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #e0e0e0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #919191;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export const Expand = styled.div<{ isPayed: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;

  background-color: ${({ isPayed }) => (isPayed ? "#27AE60" : "#EB5757")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;

  svg {
    color: #fff;
  }
`;

export const PopoverCircle = styled.div<{ isActive: boolean }>`
  width: 7px;
  height: 7px;
  background: ${({ isActive }) => (isActive ? "#ff810e" : "transparent")};
  border-radius: 100%;
`;

export const AddContactInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const DatePickerWrapper = styled.div`
  position: relative;

  .sign {
    position: absolute;
    background: var(--primary);
    border-radius: 3px 0px 0px 3px;
    width: 28px;
    height: 26px;
    /* left: 5px; */
    z-index: 1;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

export const SumWrapper = styled.div`
  position: relative;

  .sign {
    position: absolute;
    background: var(--primary);
    border-radius: 3px 0px 0px 3px;
    width: 34px;
    height: 27px;
    z-index: 1;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
  }
`;
