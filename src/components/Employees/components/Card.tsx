import { Checkbox, Divider, Stack } from "@mui/material";
import React from "react";
import { Text } from "../../../globalStyle";
import UseReplace from "../../../hooks/useReplace";
import { useNavigate } from "react-router-dom";
import { setSelectedItems } from "../../../store/slices/employeesSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { CheckboxIcon, CheckedIcon } from "../style";
import { employeeType } from "../../../store/slices/employeesSlice";
import { FlexWrapper } from "../../Common/FlexWrapper";
import AvatarWrapper from "../../Common/AvatarWrapper";

const Card: React.FC<{ data: employeeType }> = ({ data }) => {
  const { first_name, last_name, phone_number, id, image } = data;

  const { selectedItems } = useAppSelector((state) => state.employees);
  const { profile } = useAppSelector((state) => state.settings);
  const noPermission = ["account_manager", "office_manager"];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Stack
      width={"300px"}
      p="10px"
      bgcolor={"#FCFCFC"}
      boxShadow="0px 4px 6px -2px rgba(0, 0, 0, 0.1)"
      borderRadius={"3px"}
      position="relative"
    >
      {!noPermission.includes(profile.role) && (
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
      )}

      <Stack height="100%" width="100%" gap="8px">
        <FlexWrapper gap="20px" width="100%">
          <AvatarWrapper size="44px" url={image} />
          <Stack width="100%" gap="8px">
            <Text
              fs="17px"
              fw="500"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/employees${UseReplace("id", String(id))}`)
              }
            >
              {`${first_name} ${last_name}`}
            </Text>

            <Divider />

            <Text fs="10px" fw="400">
              {phone_number}
            </Text>
          </Stack>
        </FlexWrapper>
      </Stack>
    </Stack>
  );
};

export default Card;
