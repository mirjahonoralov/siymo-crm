import React, { useState, useEffect } from "react";
import { Stack, Box, SelectChangeEvent } from "@mui/material";
import { ExtraWrapper, InputWrapper } from "../style";
import { Text } from "../../../globalStyle";
import CustomInput from "../../Common/CustomInput";
import CustomButton from "../../Common/CustomButton";
import LayoutContainer from "../../Common/LayoutContainer";
import { FlexCenter } from "../../Common/FlexWrapper";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { employeeType } from "../../../store/slices/employeesSlice";
import {
  editProfileThunk,
  getProfileThunk,
} from "../../../store/actions/settingsActions";
import CustomSelect from "../../Common/CustomSelect";
import { useTranslation } from "react-i18next";
import { roleT } from "../../../store/slices/mainSlice";

const UserProfile = () => {
  const { profile, actionsPending } = useAppSelector((state) => state.settings);
  const [checkErrors, setCheckErrors] = useState(false);

  const [data, setData] = useState<employeeType>({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    role: "",
    password2: "",
    id: null,
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const roles = t("roles", { returnObjects: true }) as roleT[];

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
      setCheckErrors(false);
      dispatch(editProfileThunk(data));
    }
  };

  useEffect(() => {
    if (profile.id) setData(profile);
  }, [profile]);

  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  return (
    <LayoutContainer
      title={
        (t("settings.cards", { returnObjects: true }) as { name: string }[])[0]
          .name
      }
    >
      <FlexCenter bgcolor={"#fff"}>
        <Box p="28px">
          <Stack alignItems="center">
            <Text fs="20px" fw="400" c="#282C2D">
              {data.first_name} {data.last_name}
            </Text>
            <Text fs="13.3px" fw="400" c="#676767">
              {roles.find((item) => item.value === data.role)!?.name}
            </Text>
          </Stack>

          <Stack gap="40px" mt="40px">
            <ExtraWrapper>
              <InputWrapper>
                <span>{t("common.first-name")}</span>
                <CustomInput
                  name="first_name"
                  showError={checkErrors && !data.first_name}
                  value={data.first_name}
                  onChange={onChange}
                  width="270px"
                />
              </InputWrapper>
              <InputWrapper>
                <span>{t("common.last-name")}</span>
                <CustomInput
                  name="last_name"
                  showError={checkErrors && !data.last_name}
                  value={data.last_name}
                  onChange={onChange}
                  width="270px"
                />
              </InputWrapper>
            </ExtraWrapper>

            <ExtraWrapper>
              <InputWrapper>
                <span>{t("common.role")}</span>
                <CustomSelect
                  width="270px"
                  height="50px"
                  value={String(
                    roles.find((item) => item.value === data.role)!?.id
                  )}
                  values={roles}
                  onChange={onChangeSelect}
                />
              </InputWrapper>
              <InputWrapper>
                <span>{t("common.phoneNumber")}</span>
                <CustomInput
                  name="phone_number"
                  showError={checkErrors && !data.phone_number}
                  value={data.phone_number}
                  onChange={onChange}
                  width="270px"
                />
              </InputWrapper>
            </ExtraWrapper>

            <Stack gap="20px" alignItems={"center"}>
              <ExtraWrapper>
                <InputWrapper>
                  <span>{t("common.username")}</span>
                  <CustomInput
                    name="username"
                    showError={checkErrors && !data.username}
                    value={data.username}
                    onChange={onChange}
                    width="270px"
                    type="text"
                  />
                </InputWrapper>
                <InputWrapper>
                  <span>{t("common.password")}</span>
                  <CustomInput
                    name="password2"
                    showError={checkErrors && !data.password2}
                    value={data.password2}
                    onChange={onChange}
                    width="270px"
                    type="text"
                  />
                </InputWrapper>
              </ExtraWrapper>

              <CustomButton
                bgColor="var(--primary)"
                color="#fff"
                fs="12px"
                value={t("common.save")}
                type="submit"
                width="180px"
                onClick={handleSubmit}
                loading={actionsPending === "editing-profile"}
              />
            </Stack>
          </Stack>
        </Box>
      </FlexCenter>
    </LayoutContainer>
  );
};

export default UserProfile;
