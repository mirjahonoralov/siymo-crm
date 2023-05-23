import { Stack } from "@mui/material";
import { Circle, SettingsCard } from "../style";
import { Text } from "../../../globalStyle";
import { icons } from "../data";
import UseReplace from "../../../hooks/useReplace";
import { useNavigate } from "react-router-dom";
import { dataTypeT, emptyData } from "../../../store/slices/settingsSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useTranslation } from "react-i18next";

export type cardType = {
  name: string;
  path: string;
  dataType: dataTypeT;
  modal: {
    add: string;
    edit: string;
  };
};

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Stack gap="50px">
      <Text fs="32px" fw="600">
        {t("settings.title")}
      </Text>
      <Stack
        bgcolor={"#fcfcfc"}
        borderRadius="6px"
        p="25px 23px"
        width={"100%"}
        boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1)"
        gap="25px"
        display={"grid"}
        gridTemplateColumns="repeat(3, 1fr)"
        gridTemplateRows="repeat(2, 1fr)"
      >
        {(t("settings.cards", { returnObjects: true }) as cardType[]).map(
          (item, index) => (
            <SettingsCard
              key={index}
              onClick={() => {
                dispatch(emptyData(item.dataType));
                navigate(`/settings${UseReplace("action", item.path)}`);
              }}
            >
              <Circle className="img-circle">
                <img src={icons[index]} alt="" />
              </Circle>
              <Text fs="20px" fw="700">
                {item.name}
              </Text>
            </SettingsCard>
          )
        )}
      </Stack>
    </Stack>
  );
};

export default Categories;
