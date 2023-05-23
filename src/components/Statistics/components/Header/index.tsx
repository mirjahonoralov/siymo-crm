import React from "react";
import { Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import { FlexBetween, FlexWrapper } from "../../../Common/FlexWrapper";
// import searchIcon from "../../../../assets/icons/search.svg";
// import filter from "../../../../assets/icons/filter.svg";
// import filter2 from "../../../../assets/icons/settings/contact/filter.svg";
import { Add, NotificationsNone } from "@mui/icons-material";
import CustomButton from "../../../Common/CustomButton";
// import CustomInput from "../../../Common/CustomInput";
// import Popover from "./Popover";
// import { useLocation, useNavigate } from "react-router-dom";
// import UseReplace from "../../../../hooks/useReplace";
import { handleOpen } from "../../../../store/slices/applicationsSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
// import {
//   handleOpen,
// } from "../../../../store/slices/applicationsSlice";
import { NotificationWrapper } from "./style";

const Header = () => {
  const { profile } = useAppSelector((state) => state.settings);
  const { notifications } = useAppSelector((state) => state.applications);

  // const [searchValue, setSearchValue] = useState("");
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // const onChange = (value: string | number, name: string) => {
  //   setSearchValue(value as string);
  //   navigate(pathname);
  //   navigate(`${pathname}${UseReplace("search-name", String(value))}`);
  // };

  return (
    <Stack gap="20px" width="100%">
      <FlexBetween width="100%">
        <Text fw="600" fs="24px">
          Аналитика
        </Text>

        <FlexWrapper gap="14px">
          {profile.role === "account_manager" && (
            <NotificationWrapper
              onClick={() => dispatch(handleOpen("notification"))}
            >
              {notifications.length > 0 && <div className="badge"></div>}
              <NotificationsNone fontSize="medium" />
            </NotificationWrapper>
          )}

          {profile.role !== "office_manager" && (
            <CustomButton
              color="#fff"
              bgColor="var(--primary)"
              value={
                <FlexBetween gap="12px">
                  Создать заявку
                  <Add />
                </FlexBetween>
              }
              fs="18px"
              fw="700"
              type="button"
              loading={false}
              padding="12px 15px"
              width="fit-content"
              height="41px"
              onClick={() => dispatch(handleOpen("add-application"))}
            />
          )}
        </FlexWrapper>
      </FlexBetween>

      {/* <Stack gap="11px" direction={"row"}>
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
            placeholder="Введите наименование …"
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
          // onClick={() => dispatch(handleOpen("filter"))}
        />
      </Stack> */}
    </Stack>
  );
};

export default Header;
