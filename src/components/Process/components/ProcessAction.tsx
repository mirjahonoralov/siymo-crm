import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Text } from "../../../globalStyle";
import { Expand, TextWrapper } from "../style";
import user from "../../../assets/icons/settings/contact/user.svg";
import dateIcon from "../../../assets/icons/settings/contact/date.svg";
import { ArrowRight } from "@mui/icons-material";
import React from "react";
import { processT } from "../../../store/slices/processSlice";

type T = {
  item: processT;
  handleChange: (number: number, isExpanded: boolean) => void;
  expanded: number | false;
};

const ProcessAction: React.FC<T> = ({ item, handleChange, expanded }) => {
  const { activity, name, work, created_at } = item;

  return (
    <Accordion
      expanded={item.id === expanded}
      onChange={(event: React.SyntheticEvent, isExpanded: boolean) =>
        handleChange(item.id, isExpanded)
      }
      key={item.id}
      style={{
        borderRadius: "10px",
        border: item.id === expanded ? "1px solid green" : "none",
        boxShadow: "0px 4px 6px -3px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        height: "fit-content",
        position: "relative",
      }}
    >
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        style={{ paddingLeft: "30px" }}
      >
        <Expand isPayed={true}>
          <ArrowRight />
        </Expand>
        <Text c="#282C2D" fs="16px" fw="700" style={{ width: "25%" }}>
          {activity.name}
        </Text>
        <TextWrapper>
          <img src={user} alt="" />
          <Text c="#282C2D" fs="16px" fw="400">
            {name}
          </Text>
        </TextWrapper>

        <TextWrapper>
          <Text c="#282C2D" fs="16px" fw="400">
            {work.name}
          </Text>
        </TextWrapper>

        <TextWrapper>
          <img src={dateIcon} alt="" />
          <Text c="#282C2D" fs="16px" fw="400">
            {created_at}
          </Text>
        </TextWrapper>
      </AccordionSummary>
    </Accordion>
  );
};

export default ProcessAction;
