import i18next from "i18next";
import React from "react";
import styled from "styled-components";
import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Wrapper = styled.div<{
  fullWidth?: boolean;
  width?: string;
  height?: string;
  pl?: string;
  fs?: string;
  pr?: string;
  p?: string;
}>`
  width: ${({ fullWidth }) => fullWidth && "100%"};
  text-align: start;

  input {
    width: ${({ width }) => width && width};
    width: ${({ fullWidth }) => fullWidth && "100%"};
    height: ${({ height }) => height && height};
    padding: ${({ p }) => (p ? p : "14px 21px")};
    padding-left: ${({ pl }) => pl && pl};
    padding-right: ${({ pr }) => pr && pr};
    border: 1px solid #bebebe;
    border-radius: 6px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: ${({ fs }) => (fs ? fs : "16px")};
    line-height: 19px;
    outline: none;
    background-color: #fff;

    /* Chrome, Safari, Edge, Opera */
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    [type="number"] {
      -moz-appearance: textfield;
    }
  }
`;

const Error = styled.div<{ errorFs?: string }>`
  color: red;
  margin-top: 5px;
  font-size: ${({ errorFs }) => (errorFs ? errorFs : "16px")};
`;

type InputType = {
  value: string | number;
  name: string;
  fullWidth?: boolean;
  onChange?: (e: string | number, name: string) => void;
  showError?: boolean;
  errorText?: string;
  type?: string;
  width?: string;
  height?: string;
  pl?: string;
  fs?: string;
  placeholder?: string;
  errorFs?: string;
  pr?: string;
  p?: string;
};

const CustomInput: React.FC<InputType> = ({
  value,
  name,
  fullWidth,
  onChange,
  showError,
  errorText,
  type,
  width,
  height,
  pl,
  pr,
  fs,
  placeholder,
  errorFs,
  p,
}) => {
  return (
    <Wrapper
      fullWidth={fullWidth}
      height={height}
      pl={pl}
      fs={fs}
      pr={pr}
      p={p}
      width={width}
    >
      {name === "phone_number" ? (
        <Input
          style={{ width }}
          placeholder=""
          value={value ? String(value) : "+998"}
          defaultCountry="UZ"
          onChange={(e) => (onChange ? onChange(String(e), name) : null)}
        />
      ) : (
        <input
          value={value ? String(value) : ""}
          name={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange
              ? onChange(
                  name === "username"
                    ? e.target.value.toLowerCase()
                    : e.target.value,
                  name
                )
              : null
          }
          type={type ? type : "text"}
          placeholder={placeholder}
        />
      )}
      {showError && (
        <Error errorFs={errorFs}>
          *{errorText ? errorText : i18next.t("validations.fill")}
        </Error>
      )}
    </Wrapper>
  );
};

export default CustomInput;
