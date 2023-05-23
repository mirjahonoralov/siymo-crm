import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { DatePickerWrapper } from "../../style";
import { ArrowDropDown } from "@mui/icons-material";

type T = {
  value: Dayjs | null;
  onChangePicker: (value: Dayjs | null, key: string) => void;
  title: string;
  keyPicker: string;
};

const DatePicker: React.FC<T> = ({
  value,
  onChangePicker,
  title,
  keyPicker,
}) => {
  return (
    <DatePickerWrapper>
      <span className="sign">{title}</span>
      <MUIDatePicker
        // label="Controlled picker"
        value={value}
        onChange={(e) => onChangePicker(e, keyPicker)}
        sx={{
          input: {
            padding: "5px 0 5px 10px",
            fontSize: "11px",
            width: "75px",
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
