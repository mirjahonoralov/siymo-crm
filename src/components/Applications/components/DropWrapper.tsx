import { t } from "i18next";
import { useDrop } from "react-dnd";
import {
  appT,
  appsDataT,
  handleOpen,
  onDropT,
  setCancelReason,
  setEditingApp,
  setFillPricingData,
} from "../../../store/slices/applicationsSlice";
import { statusT } from "../data";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getTypes } from "../../../store/actions/settingsActions";

type T = {
  onDrop: (data: onDropT) => void;
  children: any;
  step: string;
};

const checkPrice = (list: appT[]) => {
  let isFilled = false;
  list.forEach((item) => {
    if (!item.price) {
      isFilled = true;
      return;
    }
  });

  return isFilled;
};

const DropWrapper = ({ children, step, onDrop }: T) => {
  const { profile } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  // const [{ isOver }, drop] = useDrop({
  const [, drop] = useDrop({
    accept: "app",
    canDrop: (item: appsDataT, monitor) => {
      const items = t("applications.applicationsTypes", {
        returnObjects: true,
      }) as statusT[];

      const itemIndex = items.findIndex((si) => si.step === item.step);
      const statusIndex = items.findIndex((si) => si.step === step);

      if (itemIndex === 6 && statusIndex === 6) return false;
      else if (profile.role === "crm_manager") return true;
      else return [itemIndex + 1, 6].includes(statusIndex);
    },
    drop: (item, monitor) => {
      if (step === "paying" && checkPrice(item.applications)) {
        dispatch(setEditingApp(item));
        dispatch(handleOpen("setPricing"));
        dispatch(setFillPricingData({ item, monitor, step }));
      } else if (step === "cancelled") {
        dispatch(setCancelReason({ item, monitor, step }));
        dispatch(handleOpen("cancel-alert"));
        dispatch(getTypes({ url: "reason", dataType: "cancel" }));
      } else onDrop({ item, monitor, step });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <>
      <div
        ref={drop}
        style={{ minHeight: "180px", height: "100%", transition: "1s" }}
      >
        <div>{children}</div>
      </div>
    </>
  );
};

export default DropWrapper;
