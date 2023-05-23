import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import { FlexBetween, FlexWrapper } from "../../../Common/FlexWrapper";
import searchIcon from "../../../../assets/icons/search.svg";
import filter from "../../../../assets/icons/filter.svg";
import filter2 from "../../../../assets/icons/settings/contact/filter.svg";
import trash from "../../../../assets/icons/settings/dark-trash.svg";
import edit from "../../../../assets/icons/settings/dark-edit.svg";
import { Add } from "@mui/icons-material";
import CommonModal from "../../../Common/CustomModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import CustomButton from "../../../Common/CustomButton";
import CustomInput from "../../../Common/CustomInput";
import Popover from "./Popover";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../../../hooks/useReplace";
import { handleClose, handleOpen } from "../../../../store/slices/processSlice";
import AddProcess from "../AddProcess";
import Loading from "../../../Loading";
import { deleteProcessThunk } from "../../../../store/actions/processActions";
import { setEditingItem } from "../../../../store/slices/processSlice";
import {
  emptyCheckedItems,
  setIndicator,
} from "../../../../store/slices/processSlice";
import Filter from "../Filter";
import useSearch from "../../../../hooks/useSearch";

const Header = () => {
  const { processData, openModal, actionsPending, indicator, selectedItems } =
    useAppSelector((state) => state.process);

  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useSearch();

  const onChange = (value: string | number, name: string) => {
    setSearchValue(value as string);
    navigate(pathname);
    navigate(`${pathname}${UseReplace("search-name", String(value))}`);
  };

  return (
    <Stack gap="20px" width="100%">
      <FlexBetween width="100%">
        <Text fw="600" fs="24px">
          Бизнес-процессы
        </Text>

        {!query.get("manager") && (
          <FlexWrapper gap="13px">
            <Stack direction={"row"} gap="20px">
              <CustomButton
                bgColor="#fff"
                fs="18px"
                value={
                  actionsPending === "delete-process" ? (
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
                onClick={() => dispatch(deleteProcessThunk())}
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
                  dispatch(handleOpen("add-process"));
                  // find selected one item
                  const item = processData.results.find(
                    (item) => selectedItems[0] === item.id
                  );
                  const { activity, work, name } = item!;
                  const { id, name: workName } = work;
                  dispatch(
                    setEditingItem({
                      activity,
                      name: name || "",
                      manager: null,
                      work: { id, name: workName },
                      client: null,
                    })
                  );
                }}
                disable={!indicator.includes("edit")}
              />
              <CustomButton
                color="#fff"
                bgColor="var(--primary)"
                value={
                  <FlexBetween gap="12px">
                    Создать ,бизнес-процесс
                    <Add />
                  </FlexBetween>
                }
                fs="18px"
                fw="700"
                type="button"
                loading={false}
                padding="12px 15px"
                width="fit-content"
                height="41px"
                onClick={() => {
                  dispatch(handleOpen("add-process"));
                  dispatch(emptyCheckedItems());
                  dispatch(setIndicator(""));
                }}
              />
            </Stack>
          </FlexWrapper>
        )}
      </FlexBetween>

      {!query.get("manager") && (
        <Stack gap="11px" direction={"row"}>
          <Box position={"relative"} width="100%">
            <img
              src={searchIcon}
              alt=""
              style={{ position: "absolute", right: "10px", top: "10px" }}
            />

            <CustomInput
              name="search"
              showError={false}
              value={searchValue}
              onChange={onChange}
              fullWidth
              height="41px"
              placeholder="Введите наименование клиента…"
            />
          </Box>
          <CustomButton
            bgColor="#fff"
            value={<img src={filter2} alt="" />}
            fs="18px"
            type="button"
            loading={false}
            border="1px solid #e0e0e0"
            width="45px"
            height="41px"
            onClick={(e: any) => setAnchorEl(e.currentTarget)}
          />
          <Popover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />

          <CustomButton
            bgColor="#fff"
            value={<img src={filter} alt="" />}
            fs="18px"
            type="button"
            loading={false}
            border="1px solid #e0e0e0"
            width="45px"
            height="41px"
            onClick={() => dispatch(handleOpen("filter"))}
          />
        </Stack>
      )}

      <CommonModal
        open={openModal === "add-process"}
        handleClose={() => dispatch(handleClose())}
      >
        <AddProcess handleClose={() => dispatch(handleClose())} />
      </CommonModal>

      <CommonModal
        open={openModal === "filter"}
        handleClose={() => dispatch(handleClose())}
      >
        <Filter handleClose={() => dispatch(handleClose())} />
      </CommonModal>
    </Stack>
  );
};

export default Header;
