import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import { FlexBetween, FlexWrapper } from "../../../Common/FlexWrapper";
import searchIcon from "../../../../assets/icons/search.svg";
import filter from "../../../../assets/icons/filter.svg";
import filter2 from "../../../../assets/icons/settings/contact/filter.svg";
import { Add, NotificationsNone } from "@mui/icons-material";
import CommonModal from "../../../Common/CustomModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  handleClose,
  handleOpen,
} from "../../../../store/slices/applicationsSlice";
import CustomButton from "../../../Common/CustomButton";
import CustomInput from "../../../Common/CustomInput";
import Popover from "./Popover";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UseReplace from "../../../../hooks/useReplace";
import Filter from "../Filter";
import { NotificationWrapper } from "./style";
import Loading from "../../../Loading";
import trash from "../../../../assets/icons/settings/dark-trash.svg";
import { deleteApplicationThunk } from "../../../../store/actions/applicationsActions";

const Header = () => {
  const { openModal, notifications, actionsPending, indicator } =
    useAppSelector((state) => state.applications);
  const { profile } = useAppSelector((state) => state.settings);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const noPermission = ["account_manager", "office_manager"];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const onChange = (value: string | number, name: string) => {
    setSearchValue(value as string);
    navigate(`${pathname}${UseReplace("search-name", String(value))}`);
  };

  return (
    <Stack gap="20px" width="100%" bgcolor={"#fff"} p="20px 10px 9px">
      <FlexBetween width="100%">
        <Text fw="600" fs="24px">
          {t("applications.header.list")}
        </Text>

        <FlexWrapper gap="13px" alignItems="center">
          {!noPermission.includes(profile.role) && (
            <CustomButton
              bgColor="#fff"
              fs="18px"
              value={
                actionsPending === "delete-process" ? (
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
              onClick={() => dispatch(deleteApplicationThunk())}
              disable={!indicator.includes("delete")}
            />
          )}
          {profile.role === "account_manager" && (
            <NotificationWrapper
              onClick={() => dispatch(handleOpen("notification"))}
            >
              {notifications.length > 0 && <div className="badge"></div>}
              <NotificationsNone fontSize="medium" />
            </NotificationWrapper>
          )}
          <CustomButton
            bgColor="var(--primary)"
            fs="18px"
            value={
              <FlexBetween gap="41px">
                {t("applications.header.add")}
                <Add fontSize="large" />
              </FlexBetween>
            }
            color="#fff"
            type="button"
            height="35px"
            padding="7px 15px"
            fw="500"
            onClick={() => dispatch(handleOpen("add-application"))}
          />
        </FlexWrapper>
      </FlexBetween>

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
            onChange={onChange}
            fullWidth
            height="41px"
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
          onClick={(e: any) => setAnchorEl(e.currentTarget)}
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

      <CommonModal
        open={openModal === "filter"}
        handleClose={() => dispatch(handleClose())}
      >
        <Filter handleClose={() => dispatch(handleClose())} />
      </CommonModal>
    </Stack>
  );
};

export default Header;
