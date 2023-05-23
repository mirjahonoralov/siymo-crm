import React from "react";
import CustomSelect from "../../../Common/CustomSelect";
import { Card, CardBody, CardTop, InputWrapper } from "../../style";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import CustomInput from "../../../Common/CustomInput";
import { processPostT } from "../../../../store/slices/processSlice";

type T = {
  checkErrors: boolean;
  processData: processPostT;
  onChangeProcessData: (value: any, name: string) => void;
};

const ClientCard: React.FC<T> = ({
  checkErrors,
  processData,
  onChangeProcessData,
}) => {
  const { Data } = useAppSelector((state) => state.settings);
  const { activities, workTypes } = Data;

  return (
    <Card gridRow="1 / 2">
      <CardTop>Создать вручную данные клиента</CardTop>
      <CardBody>
        <InputWrapper>
          <span>Наименование организации</span>
          <CustomInput
            name="name"
            showError={checkErrors && !processData.name}
            value={processData.name}
            onChange={onChangeProcessData}
            fullWidth
            type="text"
            height="33px"
            pl="10px"
          />
        </InputWrapper>

        <InputWrapper>
          <span>Вид деятельности</span>
          <CustomSelect
            width="100%"
            value={processData.activity?.id}
            values={Data.activities}
            onChange={(event) =>
              onChangeProcessData(
                activities.find(
                  (item) => item.id === Number(event.target.value)
                )!,
                "activity"
              )
            }
            height="33px"
            showError={checkErrors && !processData.activity}
          />
        </InputWrapper>

        <InputWrapper>
          <span>Вид работы</span>
          <CustomSelect
            width="100%"
            value={processData.work?.id || ""}
            values={workTypes}
            onChange={(event) =>
              onChangeProcessData(
                workTypes.find(
                  (item) => item.id === Number(event.target.value)
                )!,
                "work"
              )
            }
            height="33px"
            showError={checkErrors && !processData.work}
          />
        </InputWrapper>
      </CardBody>
    </Card>
  );
};

export default ClientCard;
