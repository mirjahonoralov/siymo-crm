import { SelectChangeEvent, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Text } from "../../../globalStyle";
import CustomButton from "../../Common/CustomButton";
import CustomSelect from "../../Common/CustomSelect";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getTypes } from "../../../store/actions/settingsActions";
import useSearch from "../../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../../hooks/useReplace";
import { useTranslation } from "react-i18next";
import DatePicker from "../../Common/DatePicker";
import { FilterWrapper, SumWrapper } from "../style";
import { getApplications } from "../../../store/actions/applicationsActions";
import { FlexWrapper } from "../../Common/FlexWrapper";
import { Replay } from "@mui/icons-material";
import CustomInput from "../../Common/CustomInput";
import { getManagersThunk } from "../../../store/actions/mainActions";

const Filter: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { Data } = useAppSelector((state) => state.settings);
  const { managers } = useAppSelector((state) => state.main);
  const { jobTypes, workTypes, about } = Data;
  const query = useSearch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const onChange = (event: SelectChangeEvent, name: string) => {
    navigate(`${pathname}${UseReplace(name, event.target.value)}`);
  };

  const onChangeSum = (value: string | number, name: string) =>
    navigate(`${pathname}${UseReplace(name, String(value))}`);

  const onChangePicker = (value: Dayjs | null, keyPicker: string) => {
    const date = `${value?.year()}-${
      value?.month()! + 1 > 9
        ? value?.month()! + 1
        : "0" + (value?.month()! + 1)
    }-${value?.date()}`;
    navigate(`${pathname}${UseReplace(keyPicker, date)}`);
  };

  useEffect(() => {
    dispatch(getTypes({ url: "job/type", dataType: "jobTypes" }));
    dispatch(getTypes({ url: "work/type", dataType: "workTypes" }));
    dispatch(getTypes({ url: "survey", dataType: "about" }));
    dispatch(getManagersThunk(""));
  }, [dispatch]);

  return (
    <Stack
      gap="26px"
      bgcolor={"#FCFCFC"}
      borderRadius="5px"
      boxShadow="0px 4px 6px -3px rgba(0, 0, 0, 0.1)"
      padding="15px 37px 20px 37px"
      alignItems="center"
      position="relative"
    >
      <Text c="#4f4f4f" fs="24px" fw="700">
        {t("filter.filter")}
      </Text>

      <Stack gap="50px" direction="row">
        <Stack gap="20px" width="50%">
          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              Виды работ
            </Text>
            <CustomSelect
              width="261px"
              value={query.get("type_of_job")!}
              values={jobTypes}
              onChange={(e) => onChange(e, "type_of_job")}
            />
          </FilterWrapper>

          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              Тип проекта
            </Text>
            <CustomSelect
              width="261px"
              value={query.get("type_of_work")!}
              values={workTypes}
              onChange={(e) => onChange(e, "type_of_work")}
            />
          </FilterWrapper>

          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              Менеджер
            </Text>
            <CustomSelect
              width="261px"
              value={query.get("manager") || ""}
              values={managers.map((item) => ({
                id: item.id,
                name: `${item.first_name} ${item.last_name}`,
              }))}
              onChange={(e) => onChange(e, "manager")}
            />
          </FilterWrapper>
        </Stack>

        <Stack gap="20px" width="50%">
          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              Сумма
            </Text>
            <Stack direction={"row"} gap="15px" width="290px">
              <SumWrapper>
                <div className="sign">from</div>
                <CustomInput
                  name="price_from"
                  showError={false}
                  value={query.get("price_from")!}
                  onChange={onChangeSum}
                  fullWidth
                  height="27px"
                  fs="11px"
                  p="8px 10px 8px 40px"
                  type="number"
                />
              </SumWrapper>
              <SumWrapper>
                <div className="sign">to</div>
                <CustomInput
                  name="price_to"
                  showError={false}
                  value={query.get("price_to")!}
                  onChange={onChangeSum}
                  fullWidth
                  height="27px"
                  fs="11px"
                  p="8px 10px 8px 40px"
                  type="number"
                />
              </SumWrapper>
            </Stack>
          </FilterWrapper>
          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              {t("filter.time")}
            </Text>
            <Stack direction={"row"} gap="15px">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  keyPicker="date_from"
                  title={t("filter.from")}
                  value={dayjs(query.get("date_from")) || dayjs("2023-01-01")}
                  onChangePicker={onChangePicker}
                />

                <DatePicker
                  keyPicker="date_to"
                  title={t("filter.to")}
                  value={dayjs(query.get("date_to")) || dayjs("2023-01-01")}
                  onChangePicker={onChangePicker}
                />
              </LocalizationProvider>
            </Stack>
          </FilterWrapper>

          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              От куда о нас узнали
            </Text>
            <CustomSelect
              width="290px"
              value={query.get("survey")!}
              values={about}
              onChange={(e) => onChange(e, "survey")}
            />
          </FilterWrapper>
        </Stack>
      </Stack>

      <Stack direction={"row"} gap="17px" alignItems="center">
        <Text
          c="#6C6C6C"
          fs="20px"
          fw="700"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        >
          {t("common.cancel")}
        </Text>
        <CustomButton
          bgColor="var(--primary)"
          fs="20px"
          value="Поиск"
          color="#fff"
          type="button"
          width="123px"
          height="32px"
          padding="0"
          fw="700"
          onClick={() => dispatch(getApplications(query))}
        />
      </Stack>

      <FlexWrapper
        position="absolute"
        bottom="25px"
        right="46px"
        color="#828282"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/applications`)}
      >
        <Replay fontSize="small" />
        <Text c="#828282" fs="14px" fw="400">
          Сбросить
        </Text>
      </FlexWrapper>
    </Stack>
  );
};

export default Filter;
