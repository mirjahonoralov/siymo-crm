import styled from "styled-components";

export const Card = styled.div<{ fullWidth?: boolean; gridRow?: string }>`
  grid-row: ${({ gridRow }) => gridRow && gridRow};
  display: flex;
  flex-direction: column;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "445px")};
  background: #f2f2f2;
`;

export const CardTop = styled.div`
  padding: 15px 0;
  width: 100%;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: -0.08px;
  color: #fcfcfc;
  background-color: var(--primary);
`;

export const CardBody = styled.div`
  padding: 34px 40px;
  display: flex;
  flex-direction: column;
  gap: 37px;
  overflow: auto;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  position: relative;
  img {
    position: absolute;
    right: 10px;
    top: 5px;
  }
`;

export const EmployeesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 200px;
  overflow: auto;
  padding-right: 7px;
  padding-bottom: 5px;

  // change scrollbar
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
    background: #ffaa7a;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const Accordions = styled.div`
  /* height: calc(100vh - 230px); */
  height: 83%;
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

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 25%;
`;
