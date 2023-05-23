import React from "react";
import { Box } from "@mui/material";
import { FlexBetween, FlexCenter, FlexWrapper } from "../../Common/FlexWrapper";
import { Text } from "../../../globalStyle";
import CustomButton from "../../Common/CustomButton";
import { downloadPaymentStatistics } from "../../../store/actions/statisticsActions";
import { useAppDispatch } from "../../../hooks/reduxHooks";

type T = {
  title: string;
  color: string;
  count: number;
  isPayingStep: boolean;
};

const ApplicationTopStatus: React.FC<T> = ({
  title,
  count,
  color,
  isPayingStep,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Box bgcolor={color} borderRadius="3px" width={"100%"} paddingTop="3px">
      <FlexBetween
        p="16px 17px"
        bgcolor={"#fff"}
        borderRadius="3px"
        width={"100%"}
      >
        <Text fs="13px" fw="600" c="#282C2D">
          {title}
        </Text>

        <FlexWrapper gap="5px">
          <FlexCenter
            p="0 7px"
            border="0.713712px solid #828282"
            borderRadius={"7px"}
            height="18px"
            alignItems="center"
          >
            <Text fs="11.4px" fw="400" c="#828282">
              {count}
            </Text>
          </FlexCenter>

          {isPayingStep && (
            <CustomButton
              bgColor="#FED32C"
              fs="11px"
              value="Сдача"
              color="#000"
              type="button"
              fw="400"
              borderRadius="8px"
              height="18px"
              padding="0 7px"
              onClick={() => dispatch(downloadPaymentStatistics())}
            />
          )}
        </FlexWrapper>
      </FlexBetween>
    </Box>
  );
};

export default ApplicationTopStatus;
