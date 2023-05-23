import { Stack } from "@mui/material";
import React from "react";
import { Text } from "../../../globalStyle";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import CustomCheckbox from "../../Common/CustomCheckbox";
import { setSelectedItems } from "../../../store/slices/processSlice";
import { FlexBetween } from "../../Common/FlexWrapper";
import { managerT } from "../../../store/slices/mainSlice";
import UseReplace from "../../../hooks/useReplace";
import { useNavigate } from "react-router-dom";

const Card: React.FC<{ data: managerT }> = ({ data }) => {
  const { first_name, id, last_name, phone_number, telegram } = data;

  const { selectedItems } = useAppSelector((state) => state.process);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Stack
      width={"277px"}
      p="10px"
      bgcolor={"#FCFCFC"}
      boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.1)"
      borderRadius={"3px"}
      position="relative"
    >
      <CustomCheckbox
        id={id!}
        selectedItems={selectedItems}
        onClick={() => dispatch(setSelectedItems(id!))}
        style={{ top: "0", right: "0", position: "absolute" }}
      />

      <Stack width="100%" gap="6px" mb={"8px"}>
        <Text
          fs="14px"
          fw="400"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/process${UseReplace("manager", String(id))}`)
          }
        >
          {first_name} {last_name}
        </Text>
        <FlexBetween mr="45px">
          <Text fs="14px" fw="400">
            {phone_number}
          </Text>
          <Text fs="12px" fw="400">
            {telegram}
          </Text>
        </FlexBetween>
      </Stack>
    </Stack>
  );
};

export default Card;
