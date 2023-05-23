import { useState } from "react";
import { FlexBetween } from "../../Common/FlexWrapper";
import { Stack } from "@mui/material";
import { Text } from "../../../globalStyle";
import { Accordions } from "../style";
import filter from "../../../assets/icons/filter.svg";
import { handleOpen } from "../../../store/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import ContactAction from "./ContactAction";
import MainLoading from "../../MainLoading";
import ToBack from "../../Common/ToBack";

const SelectedContact = () => {
  const { selectedContact, actionsPending } = useAppSelector(
    (state) => state.contact
  );
  const { actions, client } = selectedContact;
  const [expanded, setExpanded] = useState<number | false>(false);
  const dispatch = useAppDispatch();

  const { name, phone_number, telegram, activity } = client!;

  const handleChange = (id: number, isExpanded: boolean) =>
    setExpanded(isExpanded ? id : false);

  return (
    <div style={{ position: "relative", height: "calc(100% - 30px)" }}>
      <ToBack to="/contact" top="-40px" />
      <FlexBetween
        p={"18px"}
        alignItems="center"
        bgcolor="#fff"
        borderRadius={"10px"}
        boxShadow="0px 4px 6px -3px rgba(0, 0, 0, 0.1)"
        mb="10px"
        mt="10px"
      >
        <div>
          <Text fs="26px" fw="500">
            {name}
          </Text>
          <FlexBetween gap="44px">
            <Text fs="16px" c="#6c6c6c" fw="500">
              {activity?.name}
            </Text>
            <Text fs="16px" fw="400" c="#2D9CDB">
              {telegram}
            </Text>
          </FlexBetween>
        </div>

        <Stack alignItems={"flex-end"} gap="7px">
          <img
            src={filter}
            alt=""
            onClick={() => dispatch(handleOpen("company-filter"))}
            style={{ cursor: "pointer" }}
          />
          <Text fs="18px" fw="400">
            {phone_number}
          </Text>
        </Stack>
      </FlexBetween>

      {actionsPending === "contact-actions" ? (
        <MainLoading />
      ) : (
        <Accordions>
          <Stack gap="10px">
            {actions?.map((item) => (
              <ContactAction
                expanded={expanded}
                item={item}
                key={item.id}
                handleChange={handleChange}
              />
            ))}
          </Stack>
        </Accordions>
      )}
    </div>
  );
};

export default SelectedContact;
