import { SelectChangeEvent, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../../../globalStyle";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createContactThunk,
  editContactThunk,
} from "../../../store/actions/contactActions";
import { dataType, postDataType } from "../../../store/slices/contactSlice";
import CustomButton from "../../Common/CustomButton";
import CustomInput from "../../Common/CustomInput";
import CustomSelect from "../../Common/CustomSelect";
import { AddContactInputWrapper } from "../style";
import AvatarWrapper from "../../Common/AvatarWrapper";
import { CameraAlt } from "@mui/icons-material";

const AddContact: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { Data } = useAppSelector((state) => state.settings);
  const { editingItem, indicator } = useAppSelector((state) => state.contact);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<postDataType | dataType>({
    name: "",
    telegram: "",
    phone_number: "",
    activity: Data.activities?.[0] || null,
    image: null,
  });
  const [checkErrors, setCheckErrors] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onChange = (value: string | number, name: string) =>
    setData({ ...data, [name]: value });

  const onChangeSelect = (event: SelectChangeEvent) =>
    setData({
      ...data,
      activity: Data.activities.find(
        (item) => item.id === Number(event.target.value)
      )!,
    });

  useEffect(() => {
    if (indicator.includes("edit")) setData(editingItem);
  }, [editingItem, indicator]);

  const handleSubmit = () => {
    if (!data.name || !data.phone_number || !data.telegram)
      setCheckErrors(true);
    else {
      if (indicator.includes("edit"))
        dispatch(editContactThunk(data as dataType));
      else dispatch(createContactThunk(data as postDataType));
    }
  };

  return (
    <Stack
      width={"400px"}
      p="16px 47px"
      gap="30px"
      alignItems={"center"}
      bgcolor="#fff"
      borderRadius={"10px"}
      boxShadow="0px 4px 6px -3px rgba(0, 0, 0, 0.1)"
    >
      <Text c="#4f4f4f" fs="24px" fw="700">
        {indicator.includes("edit") ? t("contact.edit") : t("contact.add")}
      </Text>

      <Stack gap="5px" alignItems={"center"}>
        <input
          type="file"
          id="avatar"
          style={{ display: "none" }}
          onChange={(e) => setImageFile(e.target.files![0])}
          accept="image/*"
        />

        <label htmlFor="avatar">
          {imageFile ? (
            <AvatarWrapper size="64px" url={URL.createObjectURL(imageFile)} />
          ) : data.image ? (
            <AvatarWrapper size="64px" url={data.image as string} />
          ) : (
            <CameraAlt fontSize="large" style={{ cursor: "pointer" }} />
          )}
        </label>

        <Text c="var(--primary)" fs="12px" fw="400">
          {indicator.includes("edit") ? t("contact.edit") : t("contact.add")}
        </Text>
      </Stack>

      <AddContactInputWrapper>
        <Text c="#757575" fs="12px" fw="400">
          {t("contact.company")}
        </Text>
        <CustomInput
          fs="14px"
          name="name"
          showError={checkErrors && !data.name}
          errorFs="12px"
          value={data.name}
          onChange={onChange}
          fullWidth
          type="text"
          height="30px"
          pl="10px"
        />
      </AddContactInputWrapper>

      <AddContactInputWrapper>
        <Text c="#757575" fs="12px" fw="400">
          {t("contact.activity")}
        </Text>
        <CustomSelect
          width="100%"
          value={String(data.activity?.id)}
          values={Data.activities}
          onChange={onChangeSelect}
        />
      </AddContactInputWrapper>

      <AddContactInputWrapper>
        <Text c="#757575" fs="12px" fw="400">
          {t("common.telegram")}
        </Text>
        <CustomInput
          fs="14px"
          name="telegram"
          showError={checkErrors && !data.telegram}
          errorFs="12px"
          value={data.telegram}
          errorText={t("validations.fill")!}
          onChange={onChange}
          fullWidth
          type="text"
          height="30px"
          pl="10px"
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
          errorFs="12px"
          value={data.phone_number}
          errorText={t("validations.fill")!}
          onChange={onChange}
          fullWidth
          type="number"
          height="30px"
          pl="10px"
        />
      </AddContactInputWrapper>

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
          width="123px"
          height="32px"
          padding="0"
          fw="700"
          onClick={handleSubmit}
        />
      </Stack>
    </Stack>
  );
};

export default AddContact;
