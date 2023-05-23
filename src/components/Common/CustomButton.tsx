import styled from "styled-components";
import Loading from "../Loading";

type T = {
  value: any;
  color?: string;
  width?: string;
  bgColor: string;
  fs: string;
  type?: "button" | "reset" | "submit";
  height?: string;
  padding?: string;
  fw?: string;
  shadow?: boolean;
  onClick?: (() => void) | ((e: any) => void);
  disable?: boolean;
  loading?: boolean;
  border?: string;
  borderRadius?: string;
};

type buttonType = {
  color?: string;
  width?: string;
  bgColor: string;
  fs: string;
  height?: string;
  padding?: string;
  fw?: string;
  shadow?: boolean;
  border?: string;
  borderRadius?: string;
};

const Button = styled.button<buttonType>`
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  width: ${({ width }) => (width ? width : "100%")};
  min-width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};
  outline: none;
  padding: ${({ padding }) => (padding ? padding : "10px 0")};
  font-weight: ${({ fw }) => (fw ? fw : "500")};
  font-size: ${({ fs }) => fs && fs};
  :disabled {
    opacity: 0.6;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "3px")};
  transition: 0.1s;
  border: none;
  border: ${({ border }) => border && border};

  cursor: pointer;
  :active {
    transform: scale(0.98);
  }

  box-shadow: ${({ shadow }) => shadow && "0 0 5px 4px #e0e0e0"};
`;

const CustomButton = ({
  value,
  color,
  width,
  bgColor,
  fs,
  type,
  height,
  padding,
  fw,
  shadow,
  onClick,
  disable,
  loading,
  border,
  borderRadius,
}: T) => {
  return (
    <Button
      color={color}
      width={width}
      bgColor={bgColor}
      fs={fs}
      type={type}
      height={height}
      padding={padding}
      fw={fw}
      shadow={shadow}
      onClick={onClick}
      disabled={disable}
      border={border}
      borderRadius={borderRadius}
    >
      {value}
      {loading && <Loading />}
    </Button>
  );
};

export default CustomButton;
