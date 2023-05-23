import { Box, SelectChangeEvent, Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import CustomSelect from "../../../Common/CustomSelect";
import { FlexBetween, FlexWrapper } from "../../../Common/FlexWrapper";
import DatePicker from "../../../Common/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomButton from "../../../Common/CustomButton";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../../../hooks/useReplace";
import useSearch from "../../../../hooks/useSearch";
import { downloadStatisticsByFilter } from "../../../../store/actions/statisticsActions";

const Card: React.FC<{ item: { title: string; url: string } }> = ({ item }) => {
  const { managers } = useAppSelector((state) => state.main);
  const { Data, profile } = useAppSelector((state) => state.settings);
  const { workTypes } = Data;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useSearch();
  const onChangeSelect = (event: SelectChangeEvent) =>
    navigate(`${pathname}${UseReplace("manager", event.target.value)}`);

  const onChangeSelectWorkType = (event: SelectChangeEvent) =>
    navigate(`${pathname}${UseReplace("work", event.target.value)}`);

  const onChangePicker = (value: Dayjs | null, keyPicker: string) => {
    const date = `${value?.year()}-${
      value?.month()! + 1 > 9
        ? value?.month()! + 1
        : "0" + (value?.month()! + 1)
    }-${value?.date()}`;
    navigate(`${pathname}${UseReplace(keyPicker, date)}`);
  };

  return (
    <Box
      pl="4px"
      borderRadius="9px"
      bgcolor="var(--primary)"
      boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1)"
      height="fit-content"
    >
      <Stack p="18px 24px" borderRadius="9px" gap="53px" bgcolor="#FCFCFC">
        <Text fw="600" fs="18px" c="#282C2D">
          {item.title}
        </Text>

        <Stack gap="19px">
          <FlexWrapper gap="18px">
            {profile.role !== "account_manager" && (
              <CustomSelect
                width="100%"
                value={query.get("manager") || ""}
                values={[
                  { id: 99999, name: "По всем менеджерам" },
                  ...managers.map(({ first_name, last_name, id }) => ({
                    name: `${first_name} ${last_name}`,
                    id,
                  })),
                ]}
                onChange={onChangeSelect}
                height="31px"
                showError={false}
              />
            )}

            {/* {item.url === "analytics/successful/failed/project/excel/" && (
              <CustomSelect
                width="100%"
                value={query.get("work") || ""}
                values={workTypes}
                onChange={onChangeSelectWorkType}
                height="31px"
                showError={false}
              />
            )} */}
          </FlexWrapper>
          <FlexBetween>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                color="#E0E0E0"
                keyPicker="date_from"
                title="От"
                value={dayjs(query.get("date_from")) || dayjs("2023-01-01")}
                onChangePicker={onChangePicker}
                width="85px"
                pl="15px"
              />
              <DatePicker
                color="#E0E0E0"
                keyPicker="date_to"
                title="До"
                value={dayjs(query.get("date_to")) || dayjs("2023-01-01")}
                onChangePicker={onChangePicker}
                width="85px"
                pl="15px"
              />
            </LocalizationProvider>
            <CustomButton
              color="#fff"
              bgColor="var(--primary)"
              value={"Сгенерировать"}
              fs="16px"
              fw="500"
              type="button"
              loading={false}
              padding="6px 15px"
              width="fit-content"
              onClick={() =>
                dispatch(downloadStatisticsByFilter({ query, url: item.url }))
              }
            />
          </FlexBetween>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Card;
