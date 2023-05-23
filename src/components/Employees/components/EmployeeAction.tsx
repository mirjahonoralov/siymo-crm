import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { FlexBetween, FlexWrapper } from "../../Common/FlexWrapper";
import { Box, Divider, Stack } from "@mui/material";
import { Text } from "../../../globalStyle";
import { Expand, TextWrapper } from "../style";
import user from "../../../assets/icons/settings/contact/user.svg";
import coin from "../../../assets/icons/settings/contact/coin.svg";
import dateIcon from "../../../assets/icons/settings/contact/date.svg";
import { ArrowRight } from "@mui/icons-material";
import React from "react";
import { statusT } from "../../Applications/data";
import { useTranslation } from "react-i18next";
import ProcessLine from "../../Common/ProcessLine";
import { employeeActionT } from "../../../store/slices/employeesSlice";

type T = {
  item: employeeActionT;
  handleChange: (number: number, isExpanded: boolean) => void;
  expanded: number | false;
};

const EmployeeAction: React.FC<T> = ({ item, handleChange, expanded }) => {
  const { steps, created_at, company, survey, applications } = item;
  const sum = applications.reduce(
    (prev, item) => prev + (+item.price + +item.price2) * +item.number,
    0
  );
  const { t } = useTranslation();

  return (
    <Accordion
      expanded={item.id === expanded}
      onChange={(event: React.SyntheticEvent, isExpanded: boolean) =>
        handleChange(item.id, isExpanded)
      }
      key={item.id}
      style={{
        borderRadius: "10px",
        border:
          item.id === expanded
            ? steps.some((item) => item.step === "cancelled")!
              ? "1px solid #EB5757"
              : "1px solid #27AE60"
            : "none",
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
        <Expand isPayed={!steps.some((item) => item.step === "cancelled")!}>
          <ArrowRight />
        </Expand>

        <TextWrapper>
          <img src={user} alt="" />
          <Text c="#282C2D" fs="16px" fw="400">
            {company}
          </Text>
        </TextWrapper>

        <FlexWrapper width="40%" gap="5px">
          О нас узнали:
          <Text c="#282C2D" fs="16px" fw="700">
            {survey.name.length > 30
              ? survey.name.substring(0, 30) + "..."
              : survey.name}
          </Text>
        </FlexWrapper>

        <TextWrapper>
          <img src={coin} alt="" />
          <Text c="#282C2D" fs="16px" fw="400">
            {sum}
          </Text>
        </TextWrapper>

        <TextWrapper>
          <img src={dateIcon} alt="" />
          <Text c="#282C2D" fs="16px" fw="400">
            {created_at}
          </Text>
        </TextWrapper>
      </AccordionSummary>

      <AccordionDetails>
        <Expand isPayed={!steps.some((item) => item.step === "cancelled")!} />
        <Stack width={"100%"} alignItems="center" gap="26px">
          <Box
            style={{
              width: "97%",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "5px",
            }}
          >
            {applications.map(({ job, number, price, price2, work }) => (
              <React.Fragment key={item.id}>
                <Stack display="grid" gridTemplateColumns="1fr 1fr">
                  <Text c="#6c6c6c" fs="16px" fw="400">
                    Тип проекта:{" "}
                    {job?.name?.length! > 60
                      ? job?.name?.substring(0, 60) + "..."
                      : job?.name}
                  </Text>
                  <Text c="#6c6c6c" fs="16px" fw="400">
                    Вид проекта:{" "}
                    {work?.name?.length! > 60
                      ? work?.name?.substring(0, 60) + "..."
                      : work?.name}
                  </Text>
                </Stack>

                <FlexBetween mt="10px">
                  <Stack direction={"row"} gap="5px">
                    <Text c="#6c6c6c" fs="16px" fw="400">
                      Себестоимость:
                    </Text>
                    <Text c="#6c6c6c" fs="16px" fw="600">
                      {price}
                    </Text>
                  </Stack>
                  <Stack direction={"row"} gap="5px">
                    <Text c="#6c6c6c" fs="16px" fw="400">
                      Маржинальность:
                    </Text>
                    <Text c="#6c6c6c" fs="16px" fw="600">
                      {price2}
                    </Text>
                  </Stack>

                  <Stack direction={"row"} gap="5px">
                    <Text c="#6c6c6c" fs="16px" fw="400">
                      Кол:
                    </Text>
                    <Text c="#6c6c6c" fs="16px" fw="600">
                      {number} шт
                    </Text>
                  </Stack>
                  <Stack direction={"row"} gap="5px">
                    <Text c="#6c6c6c" fs="16px" fw="400">
                      Сумма:
                    </Text>
                    <Text c="#6c6c6c" fs="16px" fw="600">
                      {(+price + +price2) * +number}
                    </Text>
                  </Stack>
                </FlexBetween>
                <Divider style={{ margin: "15px 0" }} />
              </React.Fragment>
            ))}
          </Box>

          <Box width="97%" pt="5px">
            <ProcessLine stepLength={steps.length} />
            <Box
              display="grid"
              gridTemplateColumns="repeat(7, 1fr)"
              width="100%"
            >
              {steps.map((action, index) => (
                <Stack key={index} ml={index === 0 ? "0" : "0"}>
                  <Text c="#282C2D" fs="12px" fw="700">
                    {
                      (
                        (
                          t("applications.applicationsTypes", {
                            returnObjects: true,
                          }) as []
                        )?.find(
                          (item: statusT) => item.step === action.step
                        )! as statusT
                      )?.shortTitle
                    }
                  </Text>
                  <Text c="#282C2D" fs="12px" fw="400">
                    {action.created_at}
                  </Text>
                </Stack>
              ))}

              {"1234567"
                .substring(0, 7 - steps.length)
                .split("")
                .map((item) => (
                  <div key={item}></div>
                ))}
            </Box>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default EmployeeAction;
