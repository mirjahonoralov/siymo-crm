import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { InputTitle, InputWrapper } from "../Header/style";
import { Info } from "../../style";
import { FlexBetween } from "../../../Common/FlexWrapper";
import { Text } from "../../../../globalStyle";
import CustomButton from "../../../Common/CustomButton";
import trash from "../../../../assets/icons/settings/dark-trash.svg";
import edit from "../../../../assets/icons/settings/dark-edit.svg";
import { appT } from "../../../../store/slices/applicationsSlice";
import ApplicationComp from "./ApplicationComp";
import { deleteApplicationObject } from "../../../../store/actions/applicationsActions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useSearch from "../../../../hooks/useSearch";

const BottomListItem: React.FC<{
  item: appT;
  index: number;
  setList: (arg: appT[]) => void;
  list: appT[];
  isEditingApp?: boolean;
  isFillPricing?: boolean;
}> = ({ item, index, setList, list, isEditingApp, isFillPricing }) => {
  const { cannotEditApp } = useAppSelector((state) => state.applications);
  const { number, job, price, price2, work } = item;
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const query = useSearch();

  const handleDelete = () => {
    if (isEditingApp) {
      dispatch(deleteApplicationObject({ id: item?.id, query }));
      setList(list.filter((item, i) => i !== index));
    } else setList(list.filter((item, i) => i !== index));
  };

  if (isEditing)
    return (
      <ApplicationComp
        list={list}
        setList={setList}
        editingData={item}
        setIsEditing={setIsEditing}
      />
    );

  return (
    <>
      <Stack
        direction="row"
        gap="63px"
        p="20px 24px"
        bgcolor="#E8E8E8"
        alignItems="flex-start"
        position={"relative"}
      >
        <Box position="absolute" top="5px" right="10px">
          <CustomButton
            bgColor="#fff"
            color="red"
            fs="14px"
            value={<img src={trash} style={{ color: "red" }} alt="" />}
            width="fit-content"
            padding="10px"
            fw="600"
            height="30px"
            shadow
            disable={cannotEditApp}
            onClick={handleDelete}
          />
        </Box>
        <Box position="absolute" top="5px" right="60px">
          <CustomButton
            bgColor={isFillPricing && !price ? "var(--primary)" : "#fff"}
            color="red"
            fs="14px"
            value={<img src={edit} alt="" />}
            width="fit-content"
            padding="10px"
            fw="600"
            height="30px"
            shadow
            disable={cannotEditApp}
            onClick={() => setIsEditing(true)}
          />
        </Box>

        <Stack gap="8px" width="300px" minWidth="300px">
          <InputWrapper>
            <InputTitle>Категория</InputTitle>
            <Info>
              {job?.name.length! > 30
                ? job?.name.slice(0, 30) + "..."
                : job?.name}
            </Info>
          </InputWrapper>

          <InputWrapper>
            <InputTitle>Подкатегория</InputTitle>
            <Info>
              {work?.name.length! > 30
                ? work?.name.slice(0, 30) + "..."
                : work?.name}
            </Info>
          </InputWrapper>
        </Stack>

        <Stack justifyContent="space-between">
          <FlexBetween gap="22px" mb="40px">
            <InputWrapper>
              <InputTitle>Кол-во</InputTitle>
              <Info width="70px">{number}</Info>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Себестоимость</InputTitle>
              <Info width="120px">{price}</Info>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Маржинальность</InputTitle>
              <Info width="120px">{price2}</Info>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Сумма</InputTitle>
              <Info width="100%">{+number * (+price + +price2)}</Info>
            </InputWrapper>
          </FlexBetween>
          <Text
            c="var(--primary)"
            fs="14px"
            fw="500"
            style={{ textAlign: "end" }}
          >
            Цена за штук {+price + +price2}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default BottomListItem;
