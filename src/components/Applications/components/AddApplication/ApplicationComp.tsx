import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomInput from "../../../Common/CustomInput";
import CustomSelect from "../../../Common/CustomSelect";
import { Text } from "../../../../globalStyle";
import { InputTitle, InputWrapper } from "../Header/style";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  FlexBetween,
  FlexCenter,
  FlexWrapper,
} from "../../../Common/FlexWrapper";
import { onChangeAppType } from "../types";
import { Add } from "@mui/icons-material";
import CustomButton from "../../../Common/CustomButton";
import {
  appT,
  setIsChangedAppObject,
} from "../../../../store/slices/applicationsSlice";
import { editApplicationObject } from "../../../../store/actions/applicationsActions";
import useSearch from "../../../../hooks/useSearch";
import { defaultListItem } from "../../data";

type T = {
  list: appT[];
  setList: (arg: appT[]) => void;
  editingData?: appT;
  setIsEditing?: (arg: any) => void;
  work?: {
    id: number;
    name: string;
    type_of_job: number;
  };
};

const ApplicationComp: React.FC<T> = ({
  list,
  setList,
  editingData,
  setIsEditing,
  work,
}) => {
  const { Data } = useAppSelector((state) => state.settings);
  const { isChangedAppObject, cannotEditApp } = useAppSelector(
    (state) => state.applications
  );

  const { jobTypes, workTypes } = Data;

  const [listItem, setListItem] = useState<appT>(
    editingData ? editingData : defaultListItem
  );
  const [checkErrors, setCheckErrors] = useState(false);

  const query = useSearch();
  const dispatch = useAppDispatch();

  const onChangeListItem = (value: string | number, name: string) =>
    setListItem({ ...listItem, [name]: value });

  const onChangeSelect = ({ e, name, type }: onChangeAppType) =>
    setListItem({
      ...listItem,
      [name]: Data[type].find((item) => item.id === Number(e.target.value))!,
    });

  useEffect(() => {
    if (isChangedAppObject) {
      const newList = list.map((item) => {
        if (item.id === listItem.id) return listItem;
        else return item;
      });
      setList(newList);
      if (setIsEditing) setIsEditing!(false);
      dispatch(setIsChangedAppObject());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isChangedAppObject]);

  useEffect(() => {
    if (work?.id)
      setListItem({
        ...listItem,
        work,
        job: jobTypes.find((item) => item.id === work.type_of_job)!,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work]);

  const handleAdd = () => {
    if (!listItem.job || !listItem.work) {
      setCheckErrors(true);
      return;
    }

    if (!listItem.price && !listItem.price2 && !listItem.number) {
      setList([...list, listItem]);
      setListItem(defaultListItem);
      setCheckErrors(false);
      return;
    }

    if (
      !listItem.price ||
      !listItem.price2 ||
      !listItem.number ||
      +listItem.price < 100 ||
      +listItem.price2 < 100
    )
      setCheckErrors(true);
    else {
      setList([...list, listItem]);
      setListItem(defaultListItem);
      setCheckErrors(false);
    }
  };

  return (
    <>
      <Stack p="14px 24px" bgcolor="#E8E8E8">
        <FlexBetween gap="63px" alignItems="flex-start" mb="30px">
          <InputWrapper>
            <InputTitle>Категория</InputTitle>
            <CustomSelect
              width="300px"
              value={listItem.job?.id}
              values={jobTypes}
              onChange={(e) =>
                onChangeSelect({
                  e,
                  name: "job",
                  type: "jobTypes",
                })
              }
              height="33px"
              showError={checkErrors && !listItem.job}
            />
          </InputWrapper>

          <FlexBetween gap="22px">
            <InputWrapper>
              <InputTitle>Кол-во</InputTitle>
              <CustomInput
                name="number"
                value={listItem.number}
                showError={checkErrors && !listItem.number}
                onChange={onChangeListItem}
                type="number"
                height="33px"
                pl="10px"
                errorFs="12px"
                width="70px"
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Себестоимость</InputTitle>
              <CustomInput
                name="price"
                showError={checkErrors && +listItem.price < 100}
                errorText="Мин: 100"
                value={listItem.price}
                onChange={onChangeListItem}
                fullWidth
                type="number"
                height="33px"
                pl="10px"
                errorFs="12px"
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Маржинальность</InputTitle>
              <CustomInput
                name="price2"
                showError={checkErrors && +listItem.price2 < 100}
                errorText="Мин: 100"
                value={listItem.price2}
                onChange={onChangeListItem}
                type="number"
                height="33px"
                pl="10px"
                errorFs="12px"
                width="120px"
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Сумма</InputTitle>
              <CustomInput
                name="sum"
                value={
                  String(
                    +listItem.number * (+listItem.price + +listItem.price2)
                  ) || ""
                }
                fullWidth
                type="number"
                height="33px"
                pl="10px"
              />
            </InputWrapper>
          </FlexBetween>
        </FlexBetween>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <InputWrapper>
            <InputTitle>Подкатегория</InputTitle>
            <CustomSelect
              width="300px"
              values={workTypes.filter(
                (item) => item.type_of_job === listItem.job?.id
              )}
              value={listItem.work?.id}
              onChange={(e) =>
                onChangeSelect({
                  e,
                  name: "work",
                  type: "workTypes",
                })
              }
              height="33px"
              showError={checkErrors && !listItem.work}
            />
          </InputWrapper>

          {editingData && (
            <FlexWrapper gap="20px">
              <CustomButton
                bgColor="#fff"
                fs="16px"
                value={"отменить"}
                color="#000"
                type="button"
                width="123px"
                height="32px"
                padding="0"
                fw="700"
                onClick={() => (setIsEditing ? setIsEditing!(false) : null)}
              />

              <CustomButton
                bgColor="var(--primary)"
                fs="16px"
                value={"сохранить"}
                color="#fff"
                type="button"
                width="123px"
                height="32px"
                padding="0"
                fw="700"
                onClick={() =>
                  dispatch(
                    editApplicationObject({
                      query,
                      data: {
                        work: +listItem.work?.id!,
                        job: +listItem.job?.id!,
                        price: +listItem.price,
                        price2: +listItem.price2,
                        number: +listItem.number,
                      },
                      id: editingData?.id,
                    })
                  )
                }
              />
            </FlexWrapper>
          )}

          <Text
            c="var(--primary)"
            fs="14px"
            fw="500"
            style={{ textAlign: "end" }}
          >
            Цена за штук {+listItem.price + +listItem.price2}
          </Text>
        </Stack>
      </Stack>

      {!editingData && (
        <FlexCenter>
          <CustomButton
            bgColor="#fff"
            fs="20px"
            value={<Add />}
            color="#000"
            type="button"
            width="123px"
            height="32px"
            padding="0"
            fw="700"
            disable={cannotEditApp}
            onClick={handleAdd}
          />
        </FlexCenter>
      )}
    </>
  );
};

export default ApplicationComp;
