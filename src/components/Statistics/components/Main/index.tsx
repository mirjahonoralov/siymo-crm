import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Text } from "../../../../globalStyle";
import { FlexBetween } from "../../../Common/FlexWrapper";
import Chart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  downloadStatistics,
  getStatistics,
  getStatisticsTypes,
} from "../../../../store/actions/statisticsActions";
import CustomButton from "../../../Common/CustomButton";
import { Col, ColItem, VerticalDivider } from "./style";

const Main = () => {
  const { dashboardData, types } = useAppSelector((state) => state.statistics);
  const dispatch = useAppDispatch();
  const jobTotal = types.jobs.length;
  const workTotal = types.works.reduce((prev, item) => prev + item.count, 0);

  useEffect(() => {
    dispatch(getStatistics());
    dispatch(getStatisticsTypes());
  }, [dispatch]);

  return (
    <Stack
      p="17px 28px"
      bgcolor="#fcfcfc"
      gap="35px"
      boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1)"
      borderRadius="9px"
      position="relative"
    >
      <Stack direction="row" gap="60px">
        <Stack width={"50%"}>
          <FlexBetween>
            <Text fs="24px" fw="600" c="#282C2D">
              Отчёт по текущим проектам
            </Text>
            <CustomButton
              bgColor="var(--primary)"
              fs="14px"
              value="Сдача"
              color="#fff"
              type="button"
              height="21px"
              fw="700"
              width="83px"
              onClick={() => dispatch(downloadStatistics())}
            />
          </FlexBetween>
          <Chart
            options={{
              chart: {
                width: "30px",
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        color: "#282C2D",
                        label: "Общее количество",
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                    },
                  },
                },
              },
              dataLabels: {
                enabled: true,
              },

              labels: [
                "Заявки",
                "Согласование цены",
                "Согласование дизайна",
                "Изготовление",
                "Оплата",
                "успешно реализованные",
                "не реализован",
              ],
              colors: [
                "#a1a1a1",
                "#E39E4E",
                "#3B91F6",
                "#874EE3",
                "#FED32C",
                "#4EE3C0",
                "#FF525F",
              ],
            }}
            series={dashboardData}
            type="donut"
            width={"100%"}
          />
        </Stack>

        <VerticalDivider />

        <Stack direction="row" width={"50%"} gap="31px">
          <Col>
            <FlexBetween>
              <Text fs="18px" fw="600" c="var(--primary)">
                Виды работ
              </Text>
              <Text fs="18px" fw="600" c="var(--primary)">
                {workTotal}
              </Text>
            </FlexBetween>
            <Stack gap="10px">
              {types.works.map(({ count, work__name }, index) => (
                <ColItem key={index}>
                  <Text fs="12px" fw="600" c="#000">
                    {work__name}
                  </Text>
                  <Text fs="12px" fw="600" c="#000">
                    {count}
                  </Text>
                </ColItem>
              ))}
            </Stack>
          </Col>
          <Col>
            <FlexBetween>
              <Text fs="18px" fw="600" c="var(--primary)">
                Тип работ
              </Text>
              <Text fs="18px" fw="600" c="var(--primary)">
                {jobTotal}
              </Text>
            </FlexBetween>
            <Stack gap="10px">
              {types.jobs.map(({ count, job__name }, index) => (
                <ColItem key={index}>
                  <Text fs="12px" fw="600" c="#000">
                    {job__name}
                  </Text>
                  <Text fs="12px" fw="600" c="#000">
                    {count}
                  </Text>
                </ColItem>
              ))}
            </Stack>
          </Col>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Main;
