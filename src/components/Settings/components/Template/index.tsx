import { Checkbox, Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import CustomButton from "../../../Common/CustomButton";
import { FlexBetween } from "../../../Common/FlexWrapper";
import trash from "../../../../assets/icons/settings/dark-trash.svg";
import edit from "../../../../assets/icons/settings/dark-edit.svg";
import { Add } from "@mui/icons-material";
import {
  CheckboxIcon,
  CheckedIcon,
  List,
  ListItem,
  VerticalDivider,
} from "../../style";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  dataTypeT,
  emptyCheckedItems,
  handleOpen,
  setEditingItem,
  setIndicator,
  setNewTypeName,
  setSelectedItems,
} from "../../../../store/slices/settingsSlice";
import Modal from "./Modal";
import {
  deleteTypeThunk,
  getTypes,
} from "../../../../store/actions/settingsActions";
import { useEffect } from "react";
import useSearch from "../../../../hooks/useSearch";
import MainLoading from "../../../MainLoading";
import Loading from "../../../Loading";
import { useTranslation } from "react-i18next";
import { cardType } from "../Categories";

type T = {
  mainUrl: string;
  border?: string;
  dataType?: dataTypeT;
};

const Template: React.FC<T> = ({ mainUrl, border, dataType }) => {
  const { indicator, selectedItems, pending, actionsPending, Data } =
    useAppSelector((state) => state.settings);
  const { t } = useTranslation();
  const query = useSearch();

  const isViewType = query.get("action") === "view-types";
  const activeData = Data[dataType!];

  const dispatch = useAppDispatch();
  const dividerNumber = Math.ceil(activeData?.length / 2);

  useEffect(() => {
    dispatch(getTypes({ url: mainUrl, dataType }));

    isViewType && dispatch(getTypes({ url: "job/type", dataType: "jobTypes" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("i18nextLng"), dispatch]);

  return (
    <Stack gap="18px" width={"100%"}>
      <FlexBetween>
        <Text c="#6C6C6C" fs="32px" fw="600" style={{ marginLeft: "140px" }}>
          {
            (t("settings.cards", { returnObjects: true }) as cardType[]).find(
              (item) => item.path === query.get("action")
            )?.name
          }
        </Text>

        {/* action buttons */}
        <Stack direction={"row"} gap="20px">
          <CustomButton
            bgColor="#fff"
            fs="18px"
            value={
              actionsPending === "delete" ? (
                <Loading color="dark" />
              ) : (
                <img src={trash} alt="" />
              )
            }
            width="fit-content"
            padding="12px"
            fw="600"
            height="41px"
            shadow
            onClick={() =>
              dispatch(
                deleteTypeThunk({
                  url: mainUrl,
                  dataType,
                })
              )
            }
            disable={!indicator.includes("delete")}
          />
          <CustomButton
            bgColor="#fff"
            fs="18px"
            value={<img src={edit} alt="" />}
            width="fit-content"
            padding="12px"
            fw="600"
            height="41px"
            shadow
            onClick={() => {
              dispatch(handleOpen());
              // find selected one item
              const item = activeData.find(
                (item: any) => selectedItems[0] === item.id
              );
              dispatch(setNewTypeName(item?.name || ""));
              dispatch(setEditingItem(item!));
            }}
            disable={!indicator.includes("edit")}
          />
          <CustomButton
            bgColor="var(--primary)"
            color="#fff"
            fs="18px"
            value={
              <Stack direction={"row"} gap="29px">
                {t("settings.add")} <Add />
              </Stack>
            }
            width="fit-content"
            padding="7px 19px"
            fw="600"
            onClick={() => {
              dispatch(emptyCheckedItems());
              dispatch(setIndicator(""));
              dispatch(setNewTypeName(""));
              dispatch(handleOpen());
            }}
          />
        </Stack>
      </FlexBetween>

      {/* list */}
      {pending ? (
        <MainLoading />
      ) : (
        <Stack direction={"row"} gap="62px" position={"relative"}>
          <List style={{ width: "50%" }}>
            {activeData?.slice(0, dividerNumber)?.map((item, index) => (
              <ListItem key={index} border={border}>
                <Text fs="16px" fw="400">
                  {`${index + 1}. `}
                  {item.name}
                </Text>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  icon={<CheckboxIcon />}
                  onClick={() => dispatch(setSelectedItems(item.id))}
                  checkedIcon={
                    <CheckboxIcon>
                      <CheckedIcon />
                    </CheckboxIcon>
                  }
                />
              </ListItem>
            ))}
          </List>

          <VerticalDivider />

          <List style={{ width: "50%" }}>
            {activeData
              ?.slice(dividerNumber, activeData.length)
              ?.map((item, index) => (
                <ListItem key={index} border={border}>
                  <Text fs="16px" fw="400">
                    {`${dividerNumber + index + 1}. `}
                    {item.name}
                  </Text>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    icon={<CheckboxIcon />}
                    onClick={() => dispatch(setSelectedItems(item.id))}
                    checkedIcon={
                      <CheckboxIcon>
                        <CheckedIcon />
                      </CheckboxIcon>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Stack>
      )}

      {/* modal */}
      <Modal dataType={dataType!} mainUrl={mainUrl} />
    </Stack>
  );
};

export default Template;
