import { useState } from "react";
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Close } from "@mui/icons-material";
import CustomButton from "../../Common/CustomButton";
import { NotificationCardsWrapper, NotificationWrapper } from "../style";
import notification from "../../../assets/icons/applications/notification.svg";
import NotificationCard from "./NotificationCard";
import MainLoading from "../../MainLoading";
import {
  handleOpen,
  setNotification,
} from "../../../store/slices/applicationsSlice";

const Notification = ({ handleClose }: { handleClose: () => void }) => {
  const { notifications, notificationsPending, actionsPending } =
    useAppSelector((state) => state.applications);

  const [selectedCard, setSelectedCard] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      setNotification(
        notifications.find((item) => item.id === selectedCard[0])!
      )
    );

    dispatch(handleOpen("add-application"));
  };

  return (
    <Stack
      width="506px"
      position="relative"
      p="100px 24px 27px 24px"
      bgcolor="#fff"
      borderRadius="13px"
      boxShadow="-166px 4px 5px 11px rgba(0, 0, 0, 0.25)"
    >
      <Close
        style={{
          position: "absolute",
          top: "23px",
          right: "23px",
          cursor: "pointer",
        }}
        onClick={handleClose}
      />

      <NotificationWrapper>
        <img src={notification} alt="" />
      </NotificationWrapper>

      {notificationsPending ? (
        <MainLoading />
      ) : (
        <NotificationCardsWrapper>
          {notifications?.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          ))}
        </NotificationCardsWrapper>
      )}

      <CustomButton
        bgColor="var(--primary)"
        fs="24px"
        value="Ok"
        color="#fff"
        type="button"
        fw="500"
        borderRadius="9px"
        onClick={handleSubmit}
        loading={actionsPending === "post-order"}
        disable={!selectedCard[0]}
      />
    </Stack>
  );
};

export default Notification;
