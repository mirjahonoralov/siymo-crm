import { SelectChangeEvent, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Text } from "../../../../globalStyle";
import CustomButton from "../../../Common/CustomButton";
import CustomSelect from "../../../Common/CustomSelect";
import dayjs, { Dayjs } from "dayjs";
import { FilterWrapper } from "../../style";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DatePicker from "./DatePicker";
import { getTypes } from "../../../../store/actions/settingsActions";
import useSearch from "../../../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../../../hooks/useReplace";
import { getContact } from "../../../../store/actions/contactActions";
import { useTranslation } from "react-i18next";
import { getManagersThunk } from "../../../../store/actions/mainActions";
import { Replay } from "@mui/icons-material";
import { FlexWrapper } from "../../../Common/FlexWrapper";

const Filter: React.FC<{
  handleClose: () => void;
  isCompany?: boolean;
}> = ({ handleClose, isCompany }) => {
  const { Data } = useAppSelector((state) => state.settings);
  const { managers } = useAppSelector((state) => state.main);
  const { activities, jobTypes, workTypes } = Data;

  const query = useSearch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const onChange = (event: SelectChangeEvent, name: string) => {
    navigate(`${pathname}${UseReplace(name, event.target.value)}`);
  };

  const onChangePicker = (value: Dayjs | null, keyPicker: string) => {
    const date = `${value?.year()}-${
      value?.month()! + 1 > 9
        ? value?.month()! + 1
        : "0" + (value?.month()! + 1)
    }-${value?.date()}`;
    navigate(`${pathname}${UseReplace(keyPicker, date)}`);
  };

  useEffect(() => {
    dispatch(getTypes({ url: "customer/activity", dataType: "activities" }));
    dispatch(getTypes({ url: "job/type", dataType: "jobTypes" }));
    dispatch(getTypes({ url: "work/type", dataType: "workTypes" }));
    dispatch(getManagersThunk(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleClickFilter = () => dispatch(getContact(query));

  return (
    <Stack
      gap="26px"
      bgcolor={"#FCFCFC"}
      borderRadius="5px"
      boxShadow="0px 4px 6px -3px rgba(0, 0, 0, 0.1)"
      padding="15px 37px"
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
              value={query.get("job") || ""}
              width="261px"
              values={jobTypes}
              onChange={(e) => onChange(e, "job")}
            />
          </FilterWrapper>

          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              Тип проекта
            </Text>
            <CustomSelect
              value={query.get("work") || ""}
              width="261px"
              values={workTypes}
              onChange={(e) => onChange(e, "work")}
            />
          </FilterWrapper>

          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              Менеджер
            </Text>
            <CustomSelect
              width="261px"
              value={query.get("manager") || ""}
              values={managers.map(({ last_name, first_name, id }) => ({
                name: `${first_name} ${last_name}`,
                id,
              }))}
              onChange={(e) => onChange(e, "manager")}
            />
          </FilterWrapper>
        </Stack>

        <Stack gap="20px" width="50%">
          {isCompany ? (
            <FilterWrapper>
              <Text c="#828282" fs="9px" fw="400">
                {t("filter.time")}
              </Text>
              <Stack direction={"row"} gap="15px" width={"100%"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    keyPicker="from"
                    title={t("filter.from")}
                    value={dayjs(query.get("from")) || dayjs("2023-01-01")}
                    onChangePicker={onChangePicker}
                  />

                  <DatePicker
                    keyPicker="to"
                    title={t("filter.to")}
                    value={dayjs(query.get("to")) || dayjs("2023-01-01")}
                    onChangePicker={onChangePicker}
                  />
                </LocalizationProvider>
              </Stack>
            </FilterWrapper>
          ) : (
            <FilterWrapper>
              <Text c="#828282" fs="9px" fw="400">
                {t("common.activity")}
              </Text>
              <CustomSelect
                width="100%"
                value={query.get("activity") || ""}
                values={activities}
                onChange={(e) => onChange(e, "activity")}
              />
            </FilterWrapper>
          )}

          <FilterWrapper>
            <Text c="#828282" fs="9px" fw="400">
              {t("filter.time")}
            </Text>
            <Stack direction={"row"} gap="15px">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  keyPicker="from"
                  title={t("filter.from")}
                  value={dayjs(query.get("from")) || dayjs("2023-01-01")}
                  onChangePicker={onChangePicker}
                />

                <DatePicker
                  keyPicker="to"
                  title={t("filter.to")}
                  value={dayjs(query.get("to")) || dayjs("2023-01-01")}
                  onChangePicker={onChangePicker}
                />
              </LocalizationProvider>
            </Stack>
          </FilterWrapper>
        </Stack>
      </Stack>

      <Stack direction={"row"} gap="17px" alignItems="center">
        <Text
          c="#6C6C6C"
          fs="20px"
          fw="700"
          onClick={() => {
            navigate(`/contact`);
            handleClose();
          }}
          style={{ cursor: "pointer" }}
        >
          {t("common.cancel")}
        </Text>
        <CustomButton
          bgColor="var(--primary)"
          fs="20px"
          value={t("filter.filter")}
          color="#fff"
          type="button"
          width="123px"
          height="32px"
          padding="0"
          fw="700"
          onClick={handleClickFilter}
        />
      </Stack>

      <FlexWrapper
        position="absolute"
        bottom="25px"
        right="46px"
        color="#828282"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/contact`)}
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
