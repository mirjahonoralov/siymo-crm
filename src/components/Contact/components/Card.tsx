import { Checkbox, Divider, Stack } from "@mui/material";
import React from "react";
import { FlexBetween, FlexWrapper } from "../../Common/FlexWrapper";
import { Text } from "../../../globalStyle";
import UseReplace from "../../../hooks/useReplace";
import { useNavigate } from "react-router-dom";
import { dataType, setSelectedItems } from "../../../store/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { CheckboxIcon, CheckedIcon } from "../style";
import AvatarWrapper from "../../Common/AvatarWrapper";

const Card: React.FC<{ data: dataType }> = ({ data }) => {
  const { id, name, phone_number, telegram, created_at, image } = data;
  const { selectedItems } = useAppSelector((state) => state.contact);
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
      <Checkbox
        sx={{ position: "absolute", top: "0", right: "0" }}
        checked={selectedItems.includes(id!)}
        icon={<CheckboxIcon />}
        onClick={() => dispatch(setSelectedItems(id!))}
        checkedIcon={
          <CheckboxIcon>
            <CheckedIcon />
          </CheckboxIcon>
        }
      />

      <Stack height="100%" width="100%" gap="15px" mb={"8px"}>
        <FlexWrapper gap="20px" width="100%">
          <AvatarWrapper size="44px" url={image} />
          <Stack width="100%" gap="8px">
            <Text
              fs="14px"
              fw="500"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/contact${UseReplace("id", String(id))}`)
              }
            >
              {name}
            </Text>
            <FlexBetween height={"100%"}>
              <Text fs="10px" fw="400">
                {phone_number}
              </Text>
              <Text fs="10px" fw="400" c="#2D9CDB">
                {telegram}
              </Text>
            </FlexBetween>
          </Stack>
        </FlexWrapper>
      </Stack>

      <Divider />

      <FlexBetween mt={"5px"}>
        <div></div>
        <Text fs="10px" fw="400" c="#828282">
          {created_at}
        </Text>
      </FlexBetween>
    </Stack>
  );
};

export default Card;
