import CommonModal from "../../../Common/CustomModal";
import CustomInput from "../../../Common/CustomInput";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { ModalWrapper } from "../../style";
import { Text } from "../../../../globalStyle";
import {
  dataTypeT,
  handleClose,
  setNewTypeName,
} from "../../../../store/slices/settingsSlice";
import CustomButton from "../../../Common/CustomButton";
import { SelectChangeEvent, Stack } from "@mui/material";
import {
  createTypeThunk,
  editTypeThunk,
} from "../../../../store/actions/settingsActions";
import CustomSelect from "../../../Common/CustomSelect";
import { useEffect, useState } from "react";
import useSearch from "../../../../hooks/useSearch";
import { useTranslation } from "react-i18next";
import { cardType } from "../Categories";

type T = {
  dataType: dataTypeT;
  mainUrl: string;
};

type settingsDataT = {
  name: string;
  id: number;
};

const Modal: React.FC<T> = ({ dataType, mainUrl }) => {
  const dispatch = useAppDispatch();
  const query = useSearch();
  const { t } = useTranslation();

  const {
    indicator,
    newTypeName,
    openModal,
    actionsPending,
    editingItem,
    Data,
  } = useAppSelector((state) => state.settings);
  const [selectorItems, setSelectorItems] = useState<settingsDataT[]>([]);
  const [workTypeId, setWorkTypeId] = useState<number>();
  const [checkErrors, setCheckErrors] = useState(false);

  const isViewType = query.get("action") === "view-types";

  const onChange = (value: string | number, name: string) =>
    dispatch(setNewTypeName(value as string));

  const onChangeSelector = (event: SelectChangeEvent) => {
    setWorkTypeId(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (!newTypeName) setCheckErrors(true);
    else {
      setCheckErrors(false);
      if (indicator.includes("edit"))
        dispatch(
          editTypeThunk(
            isViewType
              ? { url: mainUrl, dataType, workTypeId }
              : { url: mainUrl, dataType }
          )
        );
      else if (newTypeName)
        dispatch(
          createTypeThunk({
            data: isViewType
              ? { type_of_job: workTypeId, name: newTypeName }
              : {},
            url: mainUrl,
            dataType,
          })
        );
    }
  };

  useEffect(() => {
    if (isViewType) {
      setSelectorItems(Data.jobTypes);
      // @ts-ignore
      setWorkTypeId(editingItem?.type_of_job || Data.jobTypes[0]?.id || "");
    }
  }, [isViewType, editingItem, Data.jobTypes]);

  const addTitle = (
    t("settings.cards", { returnObjects: true }) as cardType[]
  ).find((item) => item.path === query.get("action"))?.modal.add;

  const editTitle = (
    t("settings.cards", { returnObjects: true }) as cardType[]
  ).find((item) => item.path === query.get("action"))?.modal.edit;

  return (
    <CommonModal open={openModal} handleClose={() => dispatch(handleClose())}>
      <ModalWrapper>
        <Text c="#4f4f4f" fs="24px" fw="700" style={{ marginBottom: "35px" }}>
          {indicator.includes("edit") ? editTitle : addTitle}
        </Text>

        <Stack gap="20px" width="100%">
          {isViewType && (
            <CustomSelect
              values={selectorItems}
              value={String(workTypeId)}
              onChange={onChangeSelector}
              width="100%"
              height="50px"
            />
          )}

          <CustomInput
            name="type"
            showError={checkErrors && !newTypeName}
            value={newTypeName}
            fullWidth
            onChange={onChange}
          />
        </Stack>

        <Stack direction={"row"} gap="15px" mt="60px">
          <CustomButton
            bgColor="#fff"
            color="#828282"
            fs="20px"
            value={t("common.cancel")}
            width="fit-content"
            padding="5px 18px"
            fw="700"
            onClick={() => dispatch(handleClose())}
          />
          <CustomButton
            bgColor="var(--primary)"
            color="#fff"
            fs="20px"
            value={
              indicator.includes("edit") ? t("common.edit") : t("common.add")
            }
            width="fit-content"
            padding="5px 18px"
            fw="700"
            onClick={handleSubmit}
            loading={actionsPending === "create" || actionsPending === "edit"}
          />
        </Stack>
      </ModalWrapper>
    </CommonModal>
  );
};

export default Modal;
