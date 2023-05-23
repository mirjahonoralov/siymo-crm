import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover as MUIPopover,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../../../hooks/useReplace";
import useSearch from "../../../../hooks/useSearch";
import { useTranslation } from "react-i18next";
import { PopoverCircle } from "../../style";

const Popover: React.FC<{
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: (val: HTMLButtonElement | null) => void;
}> = ({ anchorEl, setAnchorEl }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useSearch();
  const { t } = useTranslation();

  const handleClosePopover = () => setAnchorEl(null);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <MUIPopover
      id={id}
      open={openPopover}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{ top: "10px", overflow: "hidden", left: "-10px" }}
    >
      <List
        sx={{
          border: "1px solid var(--primary)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            sx={{ height: "30px", gap: "10px", display: "flex" }}
            onClick={() =>
              navigate(`${pathname}${UseReplace("ordering", "alphabetic")}`)
            }
          >
            <PopoverCircle isActive={query.get("ordering") === "alphabetic"} />
            <ListItemText primary={t("contact.filterByAlphabetic")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ height: "30px", gap: "10px", display: "flex" }}
            onClick={() =>
              navigate(`${pathname}${UseReplace("ordering", "date")}`)
            }
          >
            <PopoverCircle isActive={query.get("ordering") === "date"} />
            <ListItemText primary={t("contact.filterByTime")} />
          </ListItemButton>
        </ListItem>
      </List>
    </MUIPopover>
  );
};

export default Popover;
