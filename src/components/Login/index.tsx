import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { FlexCenter } from "../Common/FlexWrapper";
import img from "../../assets/images/login.png";
import CustomInput from "../Common/CustomInput";
import CustomButton from "../Common/CustomButton";
import { httpRequest } from "../../utils/request";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { openSnackbar } from "../../store/slices/mainSlice";
import { Error } from "./style";
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [checkErrors, setCheckErrors] = useState(false);
  const { t } = useTranslation();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onChange = (value: string | number, name: string) => {
    setError(false);
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.password || !data.username) setCheckErrors(true);
    else {
      setIsLoading(true);
      const res = await dispatch(
        httpRequest({
          url: "api/login/",
          body: data,
          isLogin: true,
          method: "POST",
        })
      );

      if (res.access) {
        setError(false);
        localStorage.setItem("siymoToken", res.access);
        localStorage.setItem("siymoRefreshToken", res.refresh);
        dispatch(openSnackbar({ status: "success", message: "Success" }));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate("/statistics");
      } else setError(true);

      setIsLoading(false);
    }
  };

  return (
    <Box height={"100vh"} bgcolor={{ xs: "#FF8D3A", d800: "#fff" }}>
      <Stack
        height={{ xs: "max-content", d800: "100%" }}
        flexDirection={{ xs: "column", d800: "row" }}
        justifyContent="space-between"
      >
        <FlexCenter
          height={{ xs: "", d800: "100vh" }}
          pt={{ xs: "20px", d400: "30px", d800: "0" }}
          width="100%"
          bgcolor={{ xs: "none", d800: "var(--primary)" }}
          sx={{
            img: {
              width: { xs: "70%", d800: "100%" },
            },
          }}
        >
          <img src={img} alt="" />
        </FlexCenter>
        <FlexCenter
          height={{ xs: "", d800: "100vh" }}
          width={{ xs: "100%", d800: "500px" }}
          p="20px"
        >
          <form onSubmit={handleSubmit}>
            <Stack width={{ xs: "320px", d400: "400px" }} gap="40px">
              <Typography
                fontSize={{ xs: "30px", d400: "40px", d600: "60px" }}
                fontWeight="500"
                sx={{ color: { xs: "#fff", d800: "var(--primary)" } }}
              >
                WELCOME
              </Typography>

              {error && <Error>*{t("validations.loginError")!}</Error>}

              <Stack gap="12px">
                <Typography
                  fontSize="16px"
                  fontWeight="500"
                  sx={{ color: { xs: "#fff", d800: "#828282" } }}
                >
                  {t("login.username")}
                </Typography>
                <CustomInput
                  name="username"
                  showError={checkErrors && !data.username}
                  value={data.username}
                  fullWidth
                  onChange={onChange}
                />
              </Stack>
              <Stack gap="12px">
                <Typography
                  fontSize="16px"
                  fontWeight="500"
                  sx={{ color: { xs: "#fff", d800: "#828282" } }}
                >
                  {t("login.password")}
                </Typography>
                <CustomInput
                  type="password"
                  name="password"
                  showError={checkErrors && !data.password}
                  value={data.password}
                  fullWidth
                  onChange={onChange}
                />
              </Stack>
              <CustomButton
                color="#fff"
                bgColor="var(--dark)"
                value={t("login.login")}
                fs="18px"
                type="submit"
                loading={isLoading}
              />
            </Stack>
          </form>
        </FlexCenter>
      </Stack>
    </Box>
  );
};

export default Login;
