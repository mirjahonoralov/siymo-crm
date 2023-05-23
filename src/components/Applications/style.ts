import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  height: 100%;
  align-items: flex-end;
  position: relative;
  behavior: smooth;
  transition: 0.5s;
  transform: transition;
  padding-bottom: 9px;

  transform: rotateX(180deg);
  -moz-transform: rotateX(180deg); // Mozilla
  -webkit-transform: rotateX(180deg); // Safari and Chrome
  -ms-transform: rotateX(180deg); //  IE 9+
  -o-transform: rotateX(180deg); // Opera

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    /* display: none; */
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #e0e0e0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ffaa7a;
    border-radius: 6px;
  }
`;

export const Column = styled.div`
  transform: rotateX(180deg);
  -moz-transform: rotateX(180deg); // Mozilla
  -webkit-transform: rotateX(180deg); // Safari and Chrome
  -ms-transform: rotateX(180deg); // IE 9+
  -o-transform: rotateX(180deg); // Opera

  height: 100%;
  border-radius: 5px;
  min-width: 275px;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  width: 275px;
  min-width: 275px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 10px;
  background: #e6e6e6;
  overflow: auto;
  /* padding-bottom: 50px; */
  /* padding-top: 80px; */

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

export const MoveIcon = styled.div<{
  top?: string;
  left?: string;
  right?: string;
}>`
  width: 30px;
  height: 119px;
  background: var(--primary);
  opacity: 0.54;
  box-shadow: 0px 2px 9px 2px rgba(117, 117, 117, 0.84);
  border-radius: 6px;
  user-select: none;

  position: fixed;

  top: ${({ top }) => top && top};
  right: ${({ right }) => right && right};
  left: ${({ left }) => left && left};
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;

export const NotificationWrapper = styled.div`
  position: absolute;
  top: -60px;
  left: 192px;
  z-index: 99999999;
  width: 121px;
  height: 121px;
  background: var(--primary);
  box-shadow: 0px 0px 24px 3px rgba(253, 169, 95, 0.74);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotificationCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 240px;
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

export const PopoverCircle = styled.div<{ isActive: boolean }>`
  width: 7px;
  height: 7px;
  background: ${({ isActive }) => (isActive ? "#ff810e" : "transparent")};
  border-radius: 100%;
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

export const CancelReason = styled.div`
  position: absolute;
  top: 32px;
  right: 10px;
  color: red;
  font-size: 12px;
`;

export const Info = styled.div<{
  fullWidth?: boolean;
  width?: string;
  height?: string;
  fs?: string;
  p?: string;
}>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width && width};
  width: ${({ fullWidth }) => fullWidth && "100%"};
  height: ${({ height }) => (height ? height : "33px")};
  border: 1px solid #bebebe;
  border-radius: 6px;
  padding: ${({ p }) => (p ? p : "14px 10px")};
  background-color: #fff;
`;
