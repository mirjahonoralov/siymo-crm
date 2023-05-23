import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import CustomInput from "../../../Common/CustomInput";
import { Card, CardBody, CardTop, EmployeesWrapper } from "../../style";

import { Text } from "../../../../globalStyle";
import CustomButton from "../../../Common/CustomButton";
import SearchedEmployeeCard from "./SearchedEmployeeCard";
import { getTypes } from "../../../../store/actions/settingsActions";
import {
  createProcessThunk,
  editProcessThunk,
} from "../../../../store/actions/processActions";
import { processPostT } from "../../../../store/slices/processSlice";
import { useTranslation } from "react-i18next";
import { getManagersThunk } from "../../../../store/actions/mainActions";
import { defaultProcessData } from "../../data";
import ClientCard from "./ClientCard";
import SearchClientCard from "./SearchClientCard";

const AddProcess: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { data: contacts } = useAppSelector((state) => state.contact);
  const { managers } = useAppSelector((state) => state.main);
  const { actionsPending, editingItem, indicator } = useAppSelector(
    (state) => state.process
  );

  const [processData, setProcessData] =
    useState<processPostT>(defaultProcessData);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [checkErrors, setCheckErrors] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onChangeProcessData = (value: any, name: string) =>
    setProcessData({ ...processData, [name]: value });

  const selectContact = (id: number) => {
    const contact = contacts.results.find((item) => item.id === id);

    setProcessData({
      ...processData,
      name: contact?.name!,
      activity: { name: contact?.activity?.name!, id: contact?.activity?.id! },
      phone_number: contact?.phone_number,
      client: contact?.id || null,
    });
  };

  const handleSubmit = () => {
    if (
      !processData.manager ||
      !processData.activity ||
      !processData.name ||
      !processData.work
    )
      setCheckErrors(true);
    else
      dispatch(
        indicator.includes("edit")
          ? editProcessThunk(processData)
          : createProcessThunk(processData)
      );
  };

  useEffect(() => {
    dispatch(getTypes({ url: "customer/activity", dataType: "activities" }));
    dispatch(getTypes({ url: "work/type", dataType: "workTypes" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (searchEmployee) dispatch(getManagersThunk(searchEmployee));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchEmployee]);

  useEffect(() => {
    if (indicator.includes("edit")) setProcessData(editingItem!);
    if (!editingItem) setProcessData(defaultProcessData);
  }, [editingItem, indicator]);

  return (
    <Box borderRadius="10px" overflow="hidden">
      <Stack bgcolor="#FCFCFC" p="20px 45px" gap="31px" height="auto">
        <Text c="#828282" fs="24px" fw="700" style={{ textAlign: "center" }}>
          Создать заявку
        </Text>
        <Stack
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="1fr 1fr"
          gap="77px"
        >
          <ClientCard
            checkErrors={checkErrors}
            onChangeProcessData={onChangeProcessData}
            processData={processData}
          />

          <SearchClientCard
            processData={processData}
            selectContact={selectContact}
            setCheckErrors={setCheckErrors}
          />

          <Card>
            <CardTop>Сотрудники</CardTop>
            <CardBody>
              <CustomInput
                name="searchEmployee"
                placeholder="Введите наименование …"
                showError={false}
                value={searchEmployee}
                onChange={(value: string | number, name: string) =>
                  setSearchEmployee(value as string)
                }
                fullWidth
                type="text"
                height="33px"
                pl="10px"
              />

              <EmployeesWrapper>
                {managers?.map((item) => (
                  <SearchedEmployeeCard
                    key={item.id}
                    item={item}
                    onChangeProcessData={onChangeProcessData}
                    selectedItems={[processData.manager!]}
                  />
                ))}
              </EmployeesWrapper>
            </CardBody>
          </Card>
        </Stack>

        <Stack direction={"row"} gap="17px" justifyContent="center">
          <Text
            c="#6C6C6C"
            fs="20px"
            fw="700"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            Отменить
          </Text>
          <CustomButton
            bgColor="var(--primary)"
            fs="20px"
            value={
              indicator.includes("edit") ? t("common.edit") : t("common.add")
            }
            color="#fff"
            type="button"
            width="123px"
            height="32px"
            padding="0"
            fw="700"
            loading={actionsPending === "add-process"}
            onClick={handleSubmit}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddProcess;
