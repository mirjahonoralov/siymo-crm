import { Add } from "@mui/icons-material";
import { Box, Pagination, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Text } from "../../globalStyle";
import CustomButton from "../Common/CustomButton";
import CustomInput from "../Common/CustomInput";
import { FlexBetween } from "../Common/FlexWrapper";
import Card from "./components/Card";
import Filter from "./components/Filter";
import filter from "../../assets/icons/filter.svg";
import filter2 from "../../assets/icons/settings/contact/filter.svg";
import trash from "../../assets/icons/settings/dark-trash.svg";
import edit from "../../assets/icons/settings/dark-edit.svg";
import searchIcon from "../../assets/icons/search.svg";
import CommonModal from "../Common/CustomModal";

import useSearch from "../../hooks/useSearch";
import SelectedContact from "./components/SelectedContact";
import Popover from "./components/Popover";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  dataType,
  emptyCheckedItems,
  handleClose,
  handleOpen,
  setEditingItem,
  setIndicator,
} from "../../store/slices/contactSlice";
import AddContact from "./components/AddContact";
import {
  deleteContactThunk,
  getContact,
  getContactActions,
} from "../../store/actions/contactActions";
import { getTypes } from "../../store/actions/settingsActions";
import MainLoading from "../MainLoading";
import Loading from "../Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UseReplace from "../../hooks/useReplace";

const Contact = () => {
  const {
    openModal,
    data,
    pending,
    actionsPending,
    indicator,
    selectedItems,
    selectedContact,
  } = useAppSelector((state) => state.contact);
  const [searchValue, setSearchValue] = useState("");

  const query = useSearch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const onChange = (value: string | number, name: string) => {
    setSearchValue(value as string);
    navigate(`${pathname}${UseReplace("search-name", String(value))}`);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  useEffect(() => {
    dispatch(getContact(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query.get("ordering"), searchValue, query.get("page")]);

  useEffect(() => {
    dispatch(getTypes({ url: "customer/activity", dataType: "activities" }));
  }, [dispatch]);

  const { search } = useLocation();
  useEffect(() => {
    if (pathname === "/contact" && !search) dispatch(getContact(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, dispatch]);

  useEffect(() => {
    if (query.get("id")) dispatch(getContactActions(query.get("id")!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("id")]);

  return (
    <Stack position="relative" height="100%" spacing="14px">
      <FlexBetween>
        <Text c="#6C6C6C" fs="24px" fw="600">
          {t("contact.title")}
        </Text>

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
            onClick={() => dispatch(deleteContactThunk())}
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
              dispatch(handleOpen("add-contact"));
              // find selected one item
              const item = data.results.find(
                (item: dataType) => selectedItems[0] === item.id
              );
              dispatch(setEditingItem({ ...item! }));
            }}
            disable={!indicator.includes("edit")}
          />
          <CustomButton
            color="#fff"
            bgColor="var(--primary)"
            value={
              <FlexBetween gap="19px">
                {t("contact.add")} <Add />
              </FlexBetween>
            }
            fs="18px"
            fw="700"
            type="button"
            loading={false}
            padding="12px 15px"
            width="fit-content"
            height="41px"
            onClick={() => {
              dispatch(handleOpen("add-contact"));
              dispatch(emptyCheckedItems());
              dispatch(setIndicator(""));
            }}
          />
        </Stack>
      </FlexBetween>

      {selectedContact.client && query.get("id") ? (
        actionsPending === "contact-actions" ? (
          <MainLoading />
        ) : (
          <SelectedContact />
        )
      ) : (
        <>
          <Stack gap="11px" direction={"row"}>
            <Box position={"relative"} width="100%">
              <img
                src={searchIcon}
                alt=""
                style={{ position: "absolute", right: "10px", top: "10px" }}
              />

              <CustomInput
                name="search"
                showError={false}
                value={searchValue}
                errorText={t("validations.fill")!}
                onChange={onChange}
                fullWidth
                height="41px"
                placeholder="Введите наименование клиента…"
              />
            </Box>
            <CustomButton
              bgColor="#fff"
              value={<img src={filter2} alt="" />}
              fs="18px"
              type="button"
              loading={false}
              border="1px solid #e0e0e0"
              width="45px"
              height="41px"
              onClick={(e: any) => handleClick(e)}
            />
            <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />

            <CustomButton
              bgColor="#fff"
              value={<img src={filter} alt="" />}
              fs="18px"
              type="button"
              loading={false}
              border="1px solid #e0e0e0"
              width="45px"
              height="41px"
              onClick={() => dispatch(handleOpen("filter"))}
            />
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

      {/* modal */}
      <CommonModal
        open={openModal === "filter"}
        handleClose={() => dispatch(handleClose())}
      >
        <Filter handleClose={() => dispatch(handleClose())} />
      </CommonModal>

      <CommonModal
        open={openModal === "company-filter"}
        handleClose={() => dispatch(handleClose())}
      >
        <Filter handleClose={() => dispatch(handleClose())} isCompany />
      </CommonModal>

      <CommonModal
        open={openModal === "add-contact"}
        handleClose={() => dispatch(handleClose())}
      >
        <AddContact handleClose={() => dispatch(handleClose())} />
      </CommonModal>
    </Stack>
  );
};

export default Contact;
