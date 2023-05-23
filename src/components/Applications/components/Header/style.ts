import styled from "styled-components";

export const Card = styled.div<{ fullWidth?: boolean }>`
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
  font-size: 24px;
  line-height: 20px;
  letter-spacing: -0.08px;
  color: #fcfcfc;
  background-color: var(--primary);
`;

export const CardBody = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => (padding ? padding : "20px 38px")};
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const InputTitle = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.08px;
  color: #a7a7a7;
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

export const NotificationWrapper = styled.div`
  position: relative;
  cursor: pointer;
  height: 24px;

  .badge {
    top: -3px;
    position: absolute;
    width: 9px;
    height: 9px;
    background-color: var(--primary);
    border-radius: 100%;
    right: 0;
  }
`;
