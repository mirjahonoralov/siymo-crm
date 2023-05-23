import styled from "styled-components";

export const VerticalDivider = styled.div`
  height: calc(100% - 20px);
  width: 2px;
  background-color: #e0e0e0;

  position: absolute;
  left: 50%;
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 300px;
  overflow: auto;
  padding-right: 10px;

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

export const ColItem = styled.div`
  background: #ededed;
  border-radius: 3px;
  padding: 2px 7px;
  display: flex;
  justify-content: space-between;
`;
