import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { ArrowDropDown } from "@mui/icons-material";
import styled from "styled-components";

export const DatePickerWrapper = styled.div<{ color?: string }>`
  position: relative;

  .sign {
    position: absolute;
    background: ${({ color }) => (color ? color : "var(--primary)")};
    border-radius: 3px 0px 0px 3px;
    width: 34px;
    height: 26px;
    /* left: 5px; */
    z-index: 1;
    color: ${({ color }) => (color ? "#000" : "#fff")};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
  }
`;

type T = {
  value: Dayjs | null;
  onChangePicker: (value: Dayjs | null, key: string) => void;
  title: string;
  keyPicker: string;
  color?: string;
  width?: string;
  pl?: string;
};

const DatePicker: React.FC<T> = ({
  value,
  onChangePicker,
  title,
  keyPicker,
  color,
  width,
  pl,
}) => {
  return (
    <DatePickerWrapper color={color}>
      <span className="sign">{title}</span>
      <MUIDatePicker
        // label="Controlled picker"
        value={value}
        onChange={(e) => onChangePicker(e, keyPicker)}
        sx={{
          input: {
            padding: `5px 0 5px ${pl ? pl : "10px"}`,
            fontSize: "11px",
            width: width ? width : "75px",
            marginLeft: "26px",
          },
          button: {
            padding: "5px 7px 5px 0",
            svg: {
              width: "18px",
            },
          },
        }}
        components={{
          OpenPickerIcon: ArrowDropDown,
        }}
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;
