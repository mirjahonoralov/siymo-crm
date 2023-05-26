import { useEffect } from "react";
import { Stack } from "@mui/material";
import { FlexBetween } from "../Common/FlexWrapper";
import { Marker } from "./style";
import { Text } from "../../globalStyle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/icons/logo.png";
import logout from "../../assets/icons/menu-icons/logout.svg";
import { useTranslation } from "react-i18next";
import { icons } from "./icons";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { pages } from "./pages";
import { Language } from "@mui/icons-material";
import { getContact } from "../../store/actions/contactActions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useSearch from "../../hooks/useSearch";
import { getProfileThunk, getTypes } from "../../store/actions/settingsActions";
import { roleT } from "../../store/slices/mainSlice";
import NotFound from "../../pages/NotFound";
import {
  handleClose,
  handleOpen,
  setNotification,
} from "../../store/slices/applicationsSlice";
import CommonModal from "../Common/CustomModal";
import Notification from "../Applications/components/Notification";
import { emptyRole } from "../../store/slices/settingsSlice";
import AddApplication from "../Applications/components/AddApplication";
import { getNotifications } from "../../store/actions/applicationsActions";
import UseReplace from "../../hooks/useReplace";
import { emptyContactById } from "../../store/slices/contactSlice";

type menuType = {
  name: string;
  path: string;
  permission: string[];
};

const Layout = () => {
  const { profile } = useAppSelector((state) => state.settings);
  const { openModal, notifications } = useAppSelector(
    (state) => state.applications
  );
  const { t } = useTranslation();
  const roles = t("roles", { returnObjects: true }) as roleT[];
  const menus = t("sidebar.menus", { returnObjects: true }) as menuType[];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const query = useSearch();

  const noPaddingElements = ["/applications"];

  const changeLanguage = () =>
    i18n.changeLanguage(
      localStorage.getItem("i18nextLng") === "uz" ? "ru" : "uz"
    );

  const handleLogout = () => {
    localStorage.removeItem("siymoToken");
    dispatch(emptyRole());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getTypes({ url: "customer/activity", dataType: "activities" }));
    dispatch(getTypes({ url: "job/type", dataType: "jobTypes" }));
    dispatch(getTypes({ url: "work/type", dataType: "workTypes" }));
    dispatch(getTypes({ url: "survey", dataType: "about" }));
    dispatch(getTypes({ url: "reason", dataType: "cancel" }));
  }, [dispatch]);

  useEffect(() => {
    if (profile?.role === "account_manager") dispatch(getNotifications());
  }, [pathname, dispatch, profile?.role]);

  useEffect(() => {
    if (profile?.role === "account_manager" && notifications.length > 0)
      dispatch(handleOpen("notification"));
  }, [notifications.length, pathname, dispatch, profile?.role]);

  useEffect(() => {
    if (openModal === "") {
      dispatch(setNotification(null));
      dispatch(emptyContactById());
      if (!!query.get("search-client-name"))
        navigate(`${pathname}${UseReplace("search-client-name", "")}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, openModal]);

  return (
    <Stack display={"flex"} flexDirection="row">
      <Stack width="300px" bgcolor={"var(--dark)"} height="100vh" color="#fff">
        <Stack>
          <FlexBetween p="20px 0" alignItems={"center"} pl="20px" pr="20px">
            <img src={logo} width="145px" alt="" />
            <Language onClick={changeLanguage} style={{ cursor: "pointer" }} />
          </FlexBetween>

          <Stack p="8px 20px" bgcolor="#202020" width={"100%"}>
            <Text fs="12px" fw="400" c="#fff">
              {profile?.first_name} {profile?.last_name}
            </Text>
            <Text fs="8px" fw="400" c="#676767">
              {roles?.find((item) => item.value === profile?.role)!?.name}
            </Text>
          </Stack>
        </Stack>

        {/* list */}
        <List
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {menus
            .filter((menu) => menu.permission.includes(profile?.role))
            .map((item, index) => (
              <ListItem disablePadding key={item.name}>
                <Link
                  to={item.path}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      if (item.path === "/contact") dispatch(getContact(query));
                    }}
                    style={{
                      background:
                        pathname === item.path
                          ? "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #202020"
                          : "",
                      padding: "14px 0px 14px 20px",
                    }}
                  >
                    {pathname === item.path && <Marker />}
                    <ListItemIcon>
                      <img
                        src={icons[index]}
                        alt=""
                        style={{ width: "21px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        span: {
                          fs: "16px",
                          fontWeight: "400",
                          fontFamily: "Inter !important",
                        },
                      }}
                      primary={item.name}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
        </List>

        <Box height={"100%"} display="flex" alignContent={"flex-end"}>
          <Stack
            flexDirection={"row"}
            gap="20px"
            m="auto 30px 20px"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <img src={logout} alt="logout" style={{ width: "20px" }} />
            <Text fs="16px" fw="400" c="#fff">
              {t("sidebar.logout")}
            </Text>
          </Stack>
        </Box>
      </Stack>

      <Box
        p={!noPaddingElements.includes(pathname) ? "20px 30px 30px" : ""}
        bgcolor={" #F2F2F2"}
        width={"calc(100% - 300px)"}
        height={!noPaddingElements.includes(pathname) ? "100vh" : "100%"}
        overflow="auto"
        position={"relative"}
      >
        {pages
          .filter((page) => page.permission.includes(profile?.role))
          .find((page) => page.path === pathname)?.component || <NotFound />}
      </Box>

      <CommonModal
        open={openModal === "notification"}
        handleClose={() => dispatch(handleClose())}
        overflow="none"
      >
        <Notification handleClose={() => dispatch(handleClose())} />
      </CommonModal>

      <CommonModal
        open={openModal === "add-application"}
        handleClose={() => dispatch(handleClose())}
        customStyled
      >
        <AddApplication handleClose={() => dispatch(handleClose())} />
      </CommonModal>
    </Stack>
  );
};

export default Layout;
