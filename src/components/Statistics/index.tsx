import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";
import Main from "./components/Main";
import Card from "./components/Card";
import { getManagersThunk } from "../../store/actions/mainActions";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { getTypes } from "../../store/actions/settingsActions";

const Statistics = () => {
  const data = [
    {
      title: "Общий отчёт по менеджерам",
      url: "analytics/manager/excel/",
    },
    {
      title: "Отчёт по приходящим клиентам",
      url: "analytics/client/excel/",
    },
    {
      title: "Отчёт по реализованным проектам",
      url: "analytics/successful/project/excel/",
    },
    {
      title: "Отчёт по прошедшим и не прошедшим контрактам",
      url: "analytics/successful/failed/project/excel/",
    },
    {
      title: "Общий отчёт по CRM",
      url: "analytics/survey/excel/",
    },
    {
      title: "Отчёт по нереализованным проектам",
      url: "analytics/failed/project/excel/",
    },
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getManagersThunk(""));
    dispatch(getTypes({ url: "work/type", dataType: "workTypes" }));
  }, [dispatch]);

  return (
    <Stack gap="14px">
      <Header />
      <Main />
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr 1fr"
        columnGap="24px"
        rowGap="17px"
      >
        {data.map((item) => (
          <Card key={item.url} item={item} />
        ))}
      </Box>
    </Stack>
  );
};

export default Statistics;
