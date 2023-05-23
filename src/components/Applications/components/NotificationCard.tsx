import { Divider, Stack } from "@mui/material";
import { Text } from "../../../globalStyle";
import CustomCheckbox from "../../Common/CustomCheckbox";
import { notificationT } from "../../../store/slices/applicationsSlice";

type T = {
  selectedCard: number[];
  setSelectedCard: (arg: number[]) => void;
  item: notificationT;
};

const NotificationCard: React.FC<T> = ({
  selectedCard,
  setSelectedCard,
  item,
}) => {
  const { activity, id, name, work } = item;
  const { name: activityName } = activity;
  const { name: workTypeName } = work;

  return (
    <Stack
      width="100%"
      borderRadius="9px"
      bgcolor="rgba(214, 214, 214, 0.35)"
      p="24px 23px 17px 23px"
      position="relative"
    >
      <CustomCheckbox
        id={id}
        selectedItems={selectedCard}
        onClick={() => setSelectedCard([id])}
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
        }}
      />
      <Stack direction="row" justifyContent="space-between" mb="19px">
        <Stack gap="8px">
          <Text c="#282C2D" fw="500" fs="18px">
            {name}
          </Text>
          <Text c="#6C6C6C" fw="300" fs="16px">
            {/* {phone_number} */}
          </Text>
        </Stack>

        <Text c="#6C6C6C" fw="300" fs="16px" style={{ marginTop: "3px" }}>
          {activityName}
        </Text>
      </Stack>

      <Divider />

      <Text
        c="#282C2D"
        fw="500"
        fs="20px"
        style={{ textAlign: "center", marginTop: "17px" }}
      >
        {workTypeName}
      </Text>
    </Stack>
  );
};

export default NotificationCard;
