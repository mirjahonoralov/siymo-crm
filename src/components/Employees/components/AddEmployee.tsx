import { SelectChangeEvent, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Text } from "../../../globalStyle";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import CustomButton from "../../Common/CustomButton";
import CustomInput from "../../Common/CustomInput";
import CustomSelect from "../../Common/CustomSelect";
import { AddContactInputWrapper } from "../style";
import {
  employeePostType,
  employeeType,
} from "../../../store/slices/employeesSlice";
import {
  createEmployeeThunk,
  editEmployeeThunk,
} from "../../../store/actions/employeesActions";
import { useTranslation } from "react-i18next";
import { roleT } from "../../../store/slices/mainSlice";

const AddEmployee: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const { indicator, actionsPending, editingItem } = useAppSelector(
    (state) => state.employees
  );
  const { t } = useTranslation();
  const roles = t("roles", { returnObjects: true }) as roleT[];

  const [data, setData] = useState<employeePostType | employeeType>({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    role: roles[0].value,
    password2: "",
  });
  const [checkErrors, setCheckErrors] = useState(false);

  const dispatch = useAppDispatch();

  const onChange = (value: string | number, name: string) =>
    setData({ ...data, [name]: value });

  const onChangeSelect = (event: SelectChangeEvent) =>
    setData({
      ...data,
      role: roles.find((item) => item.id === Number(event.target.value))
        ?.value!,
    });

  const handleSubmit = () => {
    if (
      !data.first_name ||
      !data.last_name ||
      !data.password2 ||
      !data.username ||
      !data.phone_number
    )
      setCheckErrors(true);
    else {
      if (indicator.includes("edit"))
        dispatch(editEmployeeThunk(data as employeeType));
      else dispatch(createEmployeeThunk(data as employeePostType));
    }
  };

  useEffect(() => {
    if (indicator.includes("edit")) setData(editingItem!);
  }, [editingItem, indicator]);

  return (
    <Stack
      width={"670px"}
      p="33px 44px"
      gap="30px"
      alignItems={"center"}
      bgcolor="#fff"
      borderRadius={"10px"}
      boxShadow="0px 4px 6px -3px rgba(0, 0, 0, 0.1)"
      textAlign={"center"}
    >
      <Text c="#4f4f4f" fs="24px" fw="700">
        {indicator.includes("edit")
          ? t("employees.edit")
          : t("employees.addNew")}
      </Text>

      <Stack
        display={"grid"}
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr 1fr 1fr"
        rowGap="28px"
        columnGap="42px"
        width="100%"
      >
        <AddContactInputWrapper>
          <Text c="#757575" fs="12px" fw="400">
            {t("common.first-name")}
          </Text>
          <CustomInput
            fs="14px"
            name="first_name"
            showError={checkErrors && !data.first_name}
            value={data.first_name}
            onChange={onChange}
            fullWidth
            type="text"
            height="30px"
            pl="10px"
          />
        </AddContactInputWrapper>

        <AddContactInputWrapper>
          <Text c="#757575" fs="12px" fw="400">
            {t("common.last-name")}
          </Text>
          <CustomInput
            fs="14px"
            name="last_name"
            showError={checkErrors && !data.last_name}
            value={data.last_name}
            onChange={onChange}
            fullWidth
            type="text"
            height="30px"
            pl="10px"
          />
        </AddContactInputWrapper>

        <AddContactInputWrapper>
          <Text c="#757575" fs="12px" fw="400">
            {t("common.role")}
          </Text>
          <CustomSelect
            width="100%"
            value={String(
              roles.find((item) => item.value === String(data.role))!.id
            )}
            values={roles}
            onChange={onChangeSelect}
          />
        </AddContactInputWrapper>

        <AddContactInputWrapper>
          <Text c="#757575" fs="12px" fw="400">
            {t("common.phoneNumber")}
          </Text>
          <CustomInput
            fs="14px"
            name="phone_number"
            showError={checkErrors && !data.phone_number}
            value={data.phone_number}
            onChange={onChange}
            fullWidth
            type="number"
            height="30px"
            pl="10px"
          />
        </AddContactInputWrapper>

        <AddContactInputWrapper>
          <Text c="#757575" fs="12px" fw="400">
            {t("common.username")}
          </Text>
          <CustomInput
            fs="14px"
            name="username"
            showError={checkErrors && !data.username}
            value={data.username}
            onChange={onChange}
            fullWidth
            type="text"
            height="30px"
            pl="10px"
          />
        </AddContactInputWrapper>

        <AddContactInputWrapper>
          <Text c="#757575" fs="12px" fw="400">
            {t("common.password")}
          </Text>
          <CustomInput
            fs="14px"
            name="password2"
            showError={checkErrors && !data.password2}
            value={data.password2}
            onChange={onChange}
            fullWidth
            type="text"
            height="30px"
            pl="10px"
          />
        </AddContactInputWrapper>
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
          value={
            indicator.includes("edit") ? t("common.edit") : t("common.add")
          }
          color="#fff"
          type="button"
          width="150px"
          height="32px"
          padding="0"
          fw="700"
          onClick={handleSubmit}
          loading={actionsPending === "adding"}
        />
      </Stack>
    </Stack>
  );
};

export default AddEmployee;
