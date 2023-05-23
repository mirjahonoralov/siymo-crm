import { Box, Pagination, Stack } from "@mui/material";
import { useEffect } from "react";
import { Text } from "../../globalStyle";
import CustomButton from "../Common/CustomButton";
import CustomInput from "../Common/CustomInput";
import { FlexBetween } from "../Common/FlexWrapper";
import Card from "./components/Card";
import Filter from "./components/Filter";
import trash from "../../assets/icons/settings/dark-trash.svg";
import edit from "../../assets/icons/settings/dark-edit.svg";
import addUserIcon from "../../assets/icons/employees/addUserIcon.svg";
import search from "../../assets/icons/search.svg";
import CommonModal from "../Common/CustomModal";

import useSearch from "../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  emptyCheckedItems,
  handleClose,
  handleOpen,
  setEditingItem,
  setIndicator,
} from "../../store/slices/employeesSlice";
import MainLoading from "../MainLoading";
import Loading from "../Loading";
import AddEmployee from "./components/AddEmployee";
import {
  deleteEmployeeThunk,
  getEmployeeActions,
  getEmployees,
} from "../../store/actions/employeesActions";
import { useTranslation } from "react-i18next";
import SelectedEmployee from "./components/SelectedEmployee";
import UseReplace from "../../hooks/useReplace";
import { useLocation, useNavigate } from "react-router-dom";

const Employees = () => {
  const {
    openModal,
    data,
    pending,
    actionsPending,
    indicator,
    selectedItems,
    selectedEmployee,
  } = useAppSelector((state) => state.employees);
  const { profile } = useAppSelector((state) => state.settings);
  const noPermission = ["account_manager", "office_manager"];

  const query = useSearch();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onChange = (value: string | number, name: string) => {
    navigate(`${pathname}${UseReplace("search-name", String(value))}`);
    navigate(`${pathname}${UseReplace("page", "")}`);
  };

  useEffect(() => {
    dispatch(getEmployees(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    query.get("ordering"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    query.get("search-name"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    query.get("page"),
  ]);

  useEffect(() => {
    if (query.get("id")) dispatch(getEmployeeActions({ query, clear: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("id")]);

  return (
    <Stack spacing="14px" position="relative" height="100%">
      <FlexBetween>
        <Text c="#6C6C6C" fs="24px" fw="600">
          {t("employees.title")}
        </Text>

        {!noPermission.includes(profile.role) && (
          <Stack direction={"row"} gap="20px">
            <CustomButton
              bgColor="#fff"
              fs="18px"
              value={
                actionsPending === "delete" ? (
                  <Loading color="dark" />
                ) : (
                  <img src={trash} alt="" />
                )
              }
              width="fit-content"
              padding="12px"
              fw="600"
              height="41px"
              shadow
              onClick={() => dispatch(deleteEmployeeThunk())}
              disable={!indicator.includes("delete")}
            />
            <CustomButton
              bgColor="#fff"
              fs="18px"
              value={<img src={edit} alt="" />}
              width="fit-content"
              padding="12px"
              fw="600"
              height="41px"
              shadow
              onClick={() => {
                dispatch(handleOpen("edit-employee"));
                // find selected one item
                const item = data.results.find(
                  (item: any) => selectedItems[0] === item.id
                );
                dispatch(setEditingItem(item!));
              }}
              disable={!indicator.includes("edit")}
            />
            <img
              src={addUserIcon}
              alt=""
              style={{ cursor: "pointer", marginLeft: "11px" }}
              onClick={() => {
                dispatch(handleOpen("add-employee"));
                dispatch(emptyCheckedItems());
                dispatch(setIndicator(""));
              }}
            />
          </Stack>
        )}
      </FlexBetween>

      {selectedEmployee.manager && query.get("id") ? (
        actionsPending === "employee-actions" ? (
          <MainLoading />
        ) : (
          <SelectedEmployee />
        )
      ) : (
        <>
          <Stack gap="11px" direction={"row"}>
            <Box position={"relative"} width="100%">
              <img
                src={search}
                alt=""
                style={{ position: "absolute", right: "10px", top: "10px" }}
              />

              <CustomInput
                name="search"
                showError={false}
                value={query.get("search-name") || ""}
                errorText={t("validations.fill")!}
                onChange={onChange}
                fullWidth
                height="41px"
                placeholder={t("employees.placeholder")!}
              />
            </Box>
          </Stack>

          {pending ? (
            <MainLoading />
          ) : (
            <Stack direction={"row"} flexWrap="wrap" gap="10px">
              {data.results?.map((item, index) => (
                <Card key={index} data={item} />
              ))}
            </Stack>
          )}
        </>
      )}

      <Pagination
        sx={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
        }}
        count={Math.floor(data?.count / 20) + (data?.count % 20 && 1) || 1}
        page={Number(query.get("page")) || 1}
        onChange={(e, value) => {
          navigate(`${pathname}${UseReplace("page", String(value))}`);
        }}
        color="primary"
      />

      <CommonModal
        open={openModal === "company-filter"}
        handleClose={() => dispatch(handleClose())}
      >
        <Filter handleClose={() => dispatch(handleClose())} />
      </CommonModal>

      <CommonModal
        open={openModal === "add-employee" || openModal === "edit-employee"}
        handleClose={() => dispatch(handleClose())}
      >
        <AddEmployee handleClose={() => dispatch(handleClose())} />
      </CommonModal>
    </Stack>
  );
};

export default Employees;
