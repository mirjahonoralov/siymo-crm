import { useState } from "react";
import { FlexBetween } from "../../Common/FlexWrapper";
import { Stack } from "@mui/material";
import { Text } from "../../../globalStyle";
import { Accordions } from "../style";
import filter from "../../../assets/icons/filter.svg";
import { handleOpen } from "../../../store/slices/employeesSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import MainLoading from "../../MainLoading";
import EmployeeAction from "./EmployeeAction";
import { roleT } from "../../../store/slices/mainSlice";
import { useTranslation } from "react-i18next";
import ToBack from "../../Common/ToBack";

const SelectedEmployee = () => {
  const { selectedEmployee, actionsPending } = useAppSelector(
    (state) => state.employees
  );
  const { t } = useTranslation();
  const roles = t("roles", { returnObjects: true }) as roleT[];
  const { actions, manager } = selectedEmployee;
  const [expanded, setExpanded] = useState<number | false>(false);
  const dispatch = useAppDispatch();

  const {
    phone_number,
    telegram,
    first_name,
    last_name,
    role,
    username,
    password2,
  } = manager!;

  const handleChange = (id: number, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  return (
    <div style={{ position: "relative", height: "calc(100% - 30px)" }}>
      <ToBack to="/employees" left="150px" />
      <FlexBetween
        p={"18px"}
        alignItems="center"
        bgcolor="#fff"
        borderRadius={"10px"}
        boxShadow="0px 4px 6px -3px rgba(0, 0, 0, 0.1)"
        mb="10px"
      >
        <div>
          <Text fs="26px" fw="500">
            {first_name} {last_name}
          </Text>
          <FlexBetween width={"300px"}>
            <Text fs="16px" c="#6c6c6c" fw="500">
              {roles.find((item) => item.value === role)!.name}
            </Text>
            <Text fs="16px" fw="400" c="#2D9CDB">
              {telegram}
            </Text>
          </FlexBetween>
        </div>

        <Stack gap="10px">
          <Text fs="16px" c="#6c6c6c" fw="500">
            Login: {username}
          </Text>
          <Text fs="16px" c="#6c6c6c" fw="500">
            Parol: {password2}
          </Text>
        </Stack>

        <Stack alignItems={"flex-end"} gap="7px">
          <img
            src={filter}
            alt=""
            onClick={() => dispatch(handleOpen("company-filter"))}
            style={{ cursor: "pointer" }}
          />
          <Text fs="18px" fw="400">
            {phone_number}
          </Text>
        </Stack>
      </FlexBetween>

      {actionsPending === "contact-actions" ? (
        <MainLoading />
      ) : (
        <Accordions>
          <Stack gap="10px">
            {actions?.map((item) => (
              <EmployeeAction
                expanded={expanded}
                item={item}
                key={item.id}
                handleChange={handleChange}
              />
            ))}
          </Stack>
        </Accordions>
      )}
    </div>
  );
};

export default SelectedEmployee;
