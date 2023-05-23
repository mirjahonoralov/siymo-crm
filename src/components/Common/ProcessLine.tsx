import React from "react";
import styled from "styled-components";

export const ProcessLineWrapper = styled.div`
  height: 13px;
  border-radius: 6px;
  background: #e0e0e0;
  width: 100%;
  /* width: calc(100% - 80px); */
  display: grid;
  grid-template-columns: repeat(8, auto);
  justify-content: space-between;
  position: relative;
  /* padding: 3px; */

  span {
    width: 7px;
    height: 7px;
    background: #828282;
    border-radius: 100%;
    margin: 3px;
  }
`;

export const ProcessLineStyle = styled.div<{ stepCount: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 13px;
  background: #ff8d3a;
  border-radius: 8px;
  grid-column: ${({ stepCount }) => stepCount && `1 / ${stepCount + 1}`};
  /* grid-column: ${({ stepCount }) => stepCount && `1 / ${stepCount}`}; */
  /* width: calc(${({ stepCount }) => `${stepCount * (100 / 7)}%`} + 6px);
  */
  width: ${({ stepCount }) => stepCount === 0 && "0px"};
  display: grid;
  grid-template-columns: ${({ stepCount }) =>
    stepCount && `repeat(${stepCount}, auto)`};
  justify-content: space-between;

  /* padding: ${({ stepCount }) => (stepCount === 0 ? "0px" : "3px")}; */

  span {
    width: 7px;
    height: 7px;
    background: #fcfcfc;
    border-radius: 100%;
  }
`;

const ProcessLine: React.FC<{ stepLength: number }> = ({ stepLength }) => {
  return (
    <ProcessLineWrapper>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <ProcessLineStyle stepCount={stepLength}>
        {"1234567"
          .substring(0, stepLength)
          .split("")
          .map((item) => (
            <span key={item} />
          ))}
      </ProcessLineStyle>
    </ProcessLineWrapper>
  );
};

export default ProcessLine;
