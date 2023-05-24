import React, { useState } from "react";
import { Card, CardBody, CardTop, InputWrapper } from "../Header/style";
import CustomInput from "../../../Common/CustomInput";
import CustomSelect from "../../../Common/CustomSelect";
import { appsDataT } from "../../../../store/slices/applicationsSlice";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { SelectChangeEvent, Stack } from "@mui/material";
import { dataType } from "../../../../store/slices/contactSlice";
import { clientDataT } from ".";
import AvatarWrapper from "../../../Common/AvatarWrapper";
import { CameraAlt } from "@mui/icons-material";

type T = {
  checkErrors: boolean;
  clientData: clientDataT;
  editingApp: appsDataT | null;
  onChangeSelect: (e: SelectChangeEvent) => void;
  selectedContact: dataType | null;
  onChange: (value: string | number, name: string) => void;
};

const ClientCard: React.FC<T> = ({
  checkErrors,
  clientData,
  editingApp,
  onChangeSelect,
  selectedContact,
  onChange,
}) => {
  const { Data } = useAppSelector((state) => state.settings);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <Card>
      <CardTop>Создать нового клиента</CardTop>
      <CardBody>
        <InputWrapper>
          <span>Наименование организации</span>
          <CustomInput
            name="name"
            showError={checkErrors && !selectedContact && !clientData.name}
            value={clientData.name}
            onChange={!editingApp ? onChange : undefined}
            fullWidth
            type="text"
            height="33px"
            pl="10px"
          />
        </InputWrapper>

        <InputWrapper>
          <span>Вид деятельности</span>
          <CustomSelect
            width="100%"
            value={clientData.activity?.id}
            values={
              !editingApp
                ? Data?.activities
                : [
                    Data?.activities?.find(
                      (item) => item.id === clientData.activity?.id
                    )!,
                  ]
            }
            onChange={!editingApp ? onChangeSelect : undefined}
            height="33px"
            showError={checkErrors && !selectedContact && !clientData.activity}
          />
        </InputWrapper>

        <InputWrapper>
          <span>Телеграм</span>
          <CustomInput
            name="telegram"
            showError={
              checkErrors &&
              !selectedContact &&
              !(clientData.telegram || clientData.phone_number)
            }
            // showError={checkErrors && !selectedContact && !clientData.telegram}
            value={clientData.telegram}
            onChange={!editingApp ? onChange : undefined}
            fullWidth
            type="text"
            height="33px"
            pl="10px"
          />
        </InputWrapper>

        <InputWrapper>
          <span>Контактное лицо</span>
          <CustomInput
            name="person_contact"
            showError={
              checkErrors && !selectedContact && !clientData.person_contact
            }
            value={clientData.person_contact}
            onChange={!editingApp ? onChange : undefined}
            fullWidth
            type="text"
            height="33px"
            pl="10px"
          />
        </InputWrapper>

        <InputWrapper>
          <span>Телефон</span>
          <CustomInput
            name="phone_number"
            showError={
              checkErrors &&
              !selectedContact &&
              !(clientData.telegram || clientData.phone_number)
            }
            value={clientData.phone_number}
            onChange={!editingApp ? onChange : undefined}
            fullWidth
            type="number"
            height="33px"
            pl="10px"
          />
        </InputWrapper>
        <Stack alignItems={"center"}>
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
            ) : clientData.image ? (
              <AvatarWrapper size="64px" url={clientData.image as string} />
            ) : (
              <CameraAlt fontSize="large" style={{ cursor: "pointer" }} />
            )}
          </label>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ClientCard;
