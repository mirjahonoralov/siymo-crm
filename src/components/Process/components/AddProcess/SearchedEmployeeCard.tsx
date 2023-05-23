import React from "react";
import { FlexBetween } from "../../../Common/FlexWrapper";
import { Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import CustomCheckbox from "../../../Common/CustomCheckbox";
import { managerT } from "../../../../store/slices/mainSlice";

type T = {
  onChangeProcessData: (value: number | null | number[], name: string) => void;
  item: managerT;
  selectedItems: number[];
};

const SearchedEmployeeCard: React.FC<T> = ({
  item,
  onChangeProcessData,
  selectedItems,
}) => {
  const { first_name, last_name, phone_number, id, telegram } = item;

  return (
    <FlexBetween
      p="11px"
      bgcolor="#fcfcfc"
      paddingRight="0"
      boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1)"
      borderRadius="3px"
      border=" 1px solid var(--primary)"
    >
      <Stack gap="3px">
        <Text c="#282C2D" fs="14px" fw="500">
          {first_name} {last_name}
        </Text>
        <Text c="#828282" fs="10px" fw="400">
          {phone_number}
        </Text>
      </Stack>

      <Stack alignItems="flex-end">
        <CustomCheckbox
          id={id}
          selectedItems={selectedItems}
          onClick={() => onChangeProcessData(id, "manager")}
        />
        <Text c="#2D9CDB" fs="10px" fw="400" style={{ marginRight: "10px" }}>
          {telegram}
        </Text>
      </Stack>
    </FlexBetween>
  );
};

export default SearchedEmployeeCard;
