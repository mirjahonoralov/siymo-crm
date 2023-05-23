import styled from "styled-components";

type textType = {
  fs: string;
  c?: string;
  fw?: string;
};

export const Text = styled.div<textType>`
  font-size: ${({ fs }) => fs};
  color: ${({ c }) => (c ? c : "#000")};
  font-weight: ${({ fw }) => (fw ? fw : "400")};
`;
