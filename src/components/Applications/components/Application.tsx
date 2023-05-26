import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { FlexBetween, FlexWrapper } from "../../Common/FlexWrapper";
import { useDrop } from "react-dnd";
import { useRef } from "react";
import { useDrag } from "react-dnd/dist/hooks";
import {
  appsDataT,
  setEditingApp,
} from "../../../store/slices/applicationsSlice";
import { Text } from "../../../globalStyle";
import type { Identifier, XYCoord } from "dnd-core";
import dateIcon from "../../../assets/icons/process/date.svg";
import timeIcon from "../../../assets/icons/process/time.svg";
import { handleOpen } from "../../../store/slices/applicationsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { CancelReason } from "../style";
import CustomCheckbox from "../../Common/CustomCheckbox";
import { setSelectedItems } from "../../../store/slices/applicationsSlice";
import AvatarWrapper from "../../Common/AvatarWrapper";

type T = {
  item: appsDataT;
  index: number;
  step: string;
};

const Application: React.FC<T> = ({ item, index, step }) => {
  const { selectedItems } = useAppSelector((state) => state.applications);
  const { profile } = useAppSelector((state) => state.settings);
  const ref = useRef<HTMLDivElement>(null);

  const { client, reason, id, applications, created_at, manager } = item;
  const jobTypes = [applications.map((item) => item?.job?.name)].join(", ");
  const { name, phone_number, image } = client;
  const { first_name, last_name } = manager;
  const [date, time] = created_at.split(", ");
  const noPermission = ["account_manager", "office_manager"];

  const dispatch = useAppDispatch();

  const [, drop] = useDrop<appsDataT, void, { handlerId: Identifier | null }>({
    accept: "app",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: appsDataT, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index!;
      const hoverIndex = index;
      if (hoverIndex === dragIndex) return;

      const hoveredRect = ref?.current?.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor?.getClientOffset();
      const hoveredClientY = (mousePosition as XYCoord).y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoveredClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoveredClientY > hoverMiddleY) return;

      // for changing order of applications in column
      // moveItem(dragIndex, hoverIndex, item.step);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "app",
    item: () => ({ ...item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Stack
      width={"100%"}
      ref={ref}
      // data-handler-id={handlerId}
      bgcolor={isDragging ? "#FFD585" : "#FCFCFC"}
      borderRadius="6px"
      boxShadow={"0px 4px 6px -2px rgba(0, 0, 0, 0.1)"}
      p="11px"
      style={{ cursor: "move", transition: "1s", position: "relative" }}
      mt="10px"
      onClick={(e) => {
        if (e.detail === 2) {
          dispatch(setEditingApp(item));
          dispatch(handleOpen("add-application"));
        }
      }}
    >
      {!noPermission.includes(profile.role) && (
        <CustomCheckbox
          id={id!}
          selectedItems={selectedItems}
          onClick={() => dispatch(setSelectedItems(id!))}
          style={{ top: "0", right: "0", position: "absolute" }}
        />
      )}
      <CancelReason>
        {reason?.length > 15 ? reason?.slice(0, 15) + "..." : reason}
      </CancelReason>
      <Stack gap="10px" width="100%">
        <FlexWrapper gap="20px">
          <AvatarWrapper size="44px" url={image} />
          <Stack>
            <Text fs="14px" fw="500">
              {name}
            </Text>
            <Text fs="12px" fw="400" c="#828282">
              {phone_number}
            </Text>
          </Stack>
        </FlexWrapper>
        <FlexBetween width="100%">
          <FlexWrapper gap="4px" alignItems="center">
            <img src={dateIcon} alt="" style={{ marginBottom: "2px" }} />
            <Text fs="10px" fw="400" c="var(--primary)">
              {date}
            </Text>
          </FlexWrapper>
          <FlexWrapper gap="4px">
            <img src={timeIcon} alt="" style={{ marginBottom: "2px" }} />
            <Text fs="10px" fw="400" c="var(--primary)">
              {time}
            </Text>
          </FlexWrapper>
        </FlexBetween>
      </Stack>

      <Divider style={{ margin: "6px 0" }} />

      <Text fs="12px" fw="300" c="#828282">
        {jobTypes.length > 70 ? jobTypes.substring(0, 70) + "..." : jobTypes}
      </Text>

      <Text fs="12px" fw="400" c="#282C2D" style={{ marginTop: "10px" }}>
        {first_name} {last_name}
      </Text>
    </Stack>
  );
};

export default Application;
