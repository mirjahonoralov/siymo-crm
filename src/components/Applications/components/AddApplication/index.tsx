import { Box, SelectChangeEvent, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import CustomSelect from "../../../Common/CustomSelect";
import { Card, CardBody, InputTitle, InputWrapper } from "../Header/style";

import { Text } from "../../../../globalStyle";
import ApplicationComp from "./ApplicationComp";
import CustomButton from "../../../Common/CustomButton";
import {
  getContact,
  getContactById,
} from "../../../../store/actions/contactActions";
import useSearch from "../../../../hooks/useSearch";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../../../hooks/useReplace";
import {
  createApplicationThunk,
  createApplicationWithClientThunk,
  editApplicationThunk,
} from "../../../../store/actions/applicationsActions";
import { dataType } from "../../../../store/slices/contactSlice";
import { appType, onChangeAppType } from "../types";
import { appT, onDropT } from "../../../../store/slices/applicationsSlice";
import { FlexBetween } from "../../../Common/FlexWrapper";
import BottomListItem from "./BottomListItem";
import ClientCard from "./ClientCard";
import SearchClientCard from "./SearchClientCard";
import { defaultClientData } from "../../data";

export type clientDataT = {
  name: string;
  telegram: string;
  activity: { name: string; id: number } | null;
  phone_number: string;
  person_contact: string;
  image: string;
};

const AddApplication: React.FC<{
  handleClose: () => void;
  isFillPricing?: boolean;
  onDrop?: (data: onDropT) => void;
}> = ({ handleClose, isFillPricing, onDrop }) => {
  const { data: contacts, contactById } = useAppSelector(
    (state) => state.contact
  );

  const { Data } = useAppSelector((state) => state.settings);
  const { about } = Data;

  const { activities } = Data;
  const {
    actionsPending,
    editingApp,
    fillPricingData,
    cannotEditApp,
    exceptedNotification,
  } = useAppSelector((state) => state.applications);

  const [clientData, setClientData] = useState<clientDataT>(defaultClientData);
  const [applicationData, setApplicationData] = useState<appType>({
    about: null,
    client: null,
    work: undefined,
  });
  const [list, setList] = useState<appT[]>([]);

  const [selectedContact, setSelectedContact] = useState<dataType | null>(null);
  const [checkErrors, setCheckErrors] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const query = useSearch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (exceptedNotification) {
      const { activity, name, work, phone_number, telegram, client } =
        exceptedNotification;

      setApplicationData({ ...applicationData, work });
      if (client) dispatch(getContactById(client!));
      else
        setClientData({
          ...clientData,
          activity,
          name,
          phone_number,
          telegram,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exceptedNotification]);

  useEffect(() => {
    if (contactById?.id) {
      const { activity, name, phone_number, telegram } = contactById;
      setClientData({
        ...clientData,
        activity,
        name,
        phone_number,
        telegram,
      });

      navigate(`${pathname}${UseReplace("search-client-name", name)}`);
      setSelectedContact(contactById);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactById]);

  const onChange = (value: string | number, name: string) =>
    setClientData({ ...clientData, [name]: value });

  const onChangeSelect = (e: SelectChangeEvent) =>
    setClientData({
      ...clientData,
      activity: activities.find((item) => item.id === Number(e.target.value))!,
    });

  const onChangeSelectApplication = ({ e, name, type }: onChangeAppType) =>
    setApplicationData({
      ...applicationData,
      [name]: Data[type].find((item) => item.id === Number(e.target.value))!,
    });

  const selectContact = (id: number) => {
    const contact = contacts.results.find((item) => item.id === id);
    setSelectedContact(contact!);
    setClientData(defaultClientData);
  };

  const changeObject = (listData?: appT[]) =>
    (listData ? listData : list).map(
      ({ job, number, price, price2, work }) => ({
        work_id: +work?.id!,
        job_id: +job?.id!,
        price: +price,
        price2: +price2,
        number: +number,
      })
    );

  const order = {
    telegram: clientData?.telegram!,
    phone_number: clientData?.phone_number!,
    person_contact: clientData?.person_contact!,
    client: +selectedContact?.id!,
    survey: +applicationData.about?.id!,
  };

  const handleSubmit = () => {
    let access = false;
    if (selectedContact) {
      if (list.length === 0) setCheckErrors(true);
      else access = true;
    } else {
      if (
        !clientData.name ||
        !(clientData.telegram || clientData.phone_number) ||
        list.length === 0
      )
        setCheckErrors(true);
      else access = true;
    }

    if (access) {
      if (exceptedNotification)
        dispatch(
          selectedContact
            ? createApplicationThunk({ order, objects: changeObject(), query })
            : createApplicationWithClientThunk({
                user: clientData,
                appData: { order, objects: changeObject() },
                query,
                imageFile,
              })
        );
      else if (editingApp)
        dispatch(
          editApplicationThunk({
            ...order,
            client: +editingApp.client?.id!,
            objects: changeObject(),
          })
        );
      else
        dispatch(
          selectedContact
            ? createApplicationThunk({ order, objects: changeObject(), query })
            : createApplicationWithClientThunk({
                user: clientData,
                appData: { order, objects: changeObject() },
                query,
                imageFile,
              })
        );
    }

    if (access) navigate(`${pathname}${UseReplace("search-client-name", "")}`);
  };

  useEffect(() => {
    if (query.get("search-client-name")) dispatch(getContact(query));
    if (!query.get("search-client-name")) setSelectedContact(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query.get("search-client-name")]);

  useEffect(() => {
    if (editingApp) {
      const {
        client,
        phone_number,
        survey,
        telegram,
        applications,
        person_contact,
        image,
      } = editingApp;

      setApplicationData({ client: +client.id, about: survey });
      setClientData({
        activity: client.activity,
        name: client.name,
        phone_number,
        telegram,
        person_contact,
        image,
      });
      setList(applications);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFillPricing) setCheckErrors(true);
  }, [isFillPricing]);

  return (
    <Box borderRadius="10px" overflow="auto" height="95vh">
      <Stack bgcolor="#FCFCFC" p="20px 45px" gap="31px" height="auto">
        {!editingApp && (
          <>
            <Text
              c="#828282"
              fs="24px"
              fw="700"
              style={{ textAlign: "center" }}
            >
              Создать заявку
            </Text>
            <Stack direction="row" gap="77px" justifyContent="space-around">
              <ClientCard
                checkErrors={checkErrors}
                clientData={clientData}
                editingApp={editingApp}
                onChange={onChange}
                onChangeSelect={onChangeSelect}
                selectedContact={selectedContact}
                setImageFile={setImageFile}
                imageFile={imageFile}
              />

              <SearchClientCard
                editingApp={editingApp}
                selectContact={selectContact}
                selectedContact={selectedContact}
                setCheckErrors={setCheckErrors}
                setClientData={setClientData}
              />
            </Stack>
          </>
        )}

        <Card fullWidth>
          <CardBody padding="18px">
            <Text
              c="#282C2D"
              fs="24px"
              fw="700"
              style={{ textAlign: "center" }}
            >
              Заполните заявку
            </Text>

            <FlexBetween p="0 18px">
              <InputWrapper>
                <InputTitle>От куда о нас узнали</InputTitle>
                <CustomSelect
                  width="300px"
                  value={applicationData.about?.id}
                  values={about}
                  onChange={(e) =>
                    !editingApp
                      ? onChangeSelectApplication({
                          e,
                          name: "about",
                          type: "about",
                        })
                      : null
                  }
                  height="33px"
                  showError={checkErrors && !applicationData.about}
                />
              </InputWrapper>
            </FlexBetween>

            <ApplicationComp
              list={list}
              setList={setList}
              work={applicationData.work}
            />

            {list.length > 0 && (
              <Text
                c="var(--primary)"
                fs="18px"
                fw="600"
                style={{ marginTop: "10px" }}
              >
                Готовый:
              </Text>
            )}

            {list.map((item, index) => (
              <BottomListItem
                key={index}
                index={index}
                item={item}
                setList={setList}
                list={list}
                isEditingApp={!!editingApp}
                isFillPricing={isFillPricing}
              />
            ))}
          </CardBody>
        </Card>

        <Stack direction={"row"} gap="17px" justifyContent="center">
          <Text
            c="#6C6C6C"
            fs="20px"
            fw="700"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            Отменить
          </Text>
          <CustomButton
            bgColor="var(--primary)"
            fs="20px"
            value={editingApp ? "Edit" : "Создать"}
            color="#fff"
            type="button"
            width="123px"
            height="32px"
            padding="0"
            fw="700"
            loading={actionsPending === "post-application"}
            disable={cannotEditApp}
            onClick={() =>
              isFillPricing
                ? onDrop!(fillPricingData!)
                : editingApp
                ? dispatch(
                    editApplicationThunk({
                      orderId: editingApp.id,
                      objects: changeObject(list.filter((item) => !item.id)),
                      query,
                    })
                  )
                : handleSubmit()
            }
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddApplication;
