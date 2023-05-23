import { DndProvider } from "react-dnd/dist/core";
import Application from "./components/Application";
import ApplicationTopStatus from "./components/ApplicationTopStatus";
import { Column, Container, MoveIcon, Wrapper } from "./style";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef } from "react";
import DropWrapper from "./components/DropWrapper";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import { Box, Pagination, SelectChangeEvent, Stack } from "@mui/material";
import rightIcon from "../../assets/icons/applications/chevron-right.svg";
import { getApplications } from "../../store/actions/applicationsActions";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  appsDataT,
  handleClose,
  onDropT,
  setAppsData,
  setEditingApp,
} from "../../store/slices/applicationsSlice";
import MainLoading from "../MainLoading";
import CommonModal from "../Common/CustomModal";
import { statusT } from "./data";
import { httpRequest } from "../../utils/request";
import useSearch from "../../hooks/useSearch";
import CustomButton from "../Common/CustomButton";
import { Text } from "../../globalStyle";
import { FlexWrapper } from "../Common/FlexWrapper";
import CustomSelect from "../Common/CustomSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FadingBalls } from "react-cssfx-loading";
import UseReplace from "../../hooks/useReplace";
import { getContact } from "../../store/actions/contactActions";
import AddApplication from "./components/AddApplication";

export type dropType = {
  item: any;
  monitor: any;
  status: string;
};

const Applications = () => {
  const { pending, openModal, appsData, cancelReason, fillPricingData } =
    useAppSelector((state) => state.applications);

  const { Data } = useAppSelector((state) => state.settings);
  const { cancel } = Data;
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [showArrows, setShowArrows] = useState({ left: false, right: true });
  const [stepLoading, setStepLoading] = useState(false);

  const onChangeSelect = (event: SelectChangeEvent) =>
    setCancelId(
      cancel.find((item) => item.id === Number(event.target.value))!.id
    );

  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const query = useSearch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onDrop = async (data: onDropT) => {
    setStepLoading(true);
    const { item, step } = data;
    let newStepId = null as number | null;

    const newItems = appsData.results
      .filter((i) => i.id !== item.id)
      .concat({ ...item, step });

    const res = await dispatch(
      httpRequest({
        url: `step/`,
        method: "POST",
        body: cancelId
          ? { step, order: item.id, reason: cancelId }
          : { step: step, order: item.id },
      })
    );
    if (res?.id) {
      newStepId = res.id;
      const finishRes = await dispatch(
        httpRequest({
          url: `step/finish_step/`,
          method: "PATCH",
          body: { id: item.step_id },
          noJson: true,
        })
      );

      if (finishRes.status === 200) {
        if (cancelId || fillPricingData) dispatch(handleClose());
        const newChangedItems = newItems.map((app) => {
          if (app.id === item.id) return { ...app, step_id: newStepId! };
          else return app;
        });

        dispatch(
          setAppsData({ results: newChangedItems, count: appsData.count })
        );

        if (fillPricingData) dispatch(getApplications(query));
      }
    }
    setStepLoading(false);
    setCancelId(null);
  };

  // const moveItem = (dragIndex: number, hoverIndex: number, status: string) => {};

  const renderCard = useCallback((i: appsDataT, idx: number, step: string) => {
    return <Application key={i.id} item={i} index={idx} step={step} />;
  }, []);

  const ref = useRef(null);

  const handleClick = (px: number) => {
    // @ts-ignore
    ref.current.scrollLeft += px;
    // @ts-ignore
    if (ref.current.scrollLeft === 0)
      setShowArrows({ ...showArrows, left: false });
    // @ts-ignore
    else if (!showArrows.left) setShowArrows({ ...showArrows, left: true });

    // // @ts-ignore
    // if (ref.current.scrollLeft === window.innerWidth)
    //   setShowArrows({ ...showArrows, right: false });
    // // @ts-ignore
    // else if (!showArrows.right) setShowArrows({ ...showArrows, right: true });

    // ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (pathname === "/applications" && !search)
      dispatch(getApplications(query));
    if (query.get("ordering") || query.get("search-name") || query.get("page"))
      dispatch(getApplications(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);

  useEffect(() => {
    if (query.get("search-client-name")) dispatch(getContact(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);

  useEffect(() => {
    // @ts-ignore
    if (ref.current.scrollLeft === 0)
      setShowArrows({ ...showArrows, left: false });
    // @ts-ignore
    else if (!showArrows.left) setShowArrows({ ...showArrows, left: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openModal === "") dispatch(setEditingApp(null));
  }, [openModal, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Box
        height="calc(100vh - 135px)"
        p="10px 30px 0 30px"
        position="relative"
      >
        <MoveIcon top="50%" right="15px" onClick={() => handleClick(150)}>
          <img src={rightIcon} alt="" />
        </MoveIcon>
        {showArrows.left && (
          <MoveIcon top="50%" left="310px" onClick={() => handleClick(-150)}>
            <img src={rightIcon} alt="" style={{ rotate: "180deg" }} />
          </MoveIcon>
        )}
        {pending ? (
          <MainLoading />
        ) : (
          <Container ref={ref}>
            {(
              t("applications.applicationsTypes", { returnObjects: true }) as []
            ).map(({ color, title, step }: statusT, index: number) => (
              <Column key={index}>
                <Box width={"100%"} bgcolor="#e6e6e6" p="10px" pb="5px">
                  <ApplicationTopStatus
                    color={color}
                    count={
                      appsData.results?.filter((i) => i?.step === step).length
                    }
                    title={title}
                    isPayingStep={step === "paying"}
                  />
                </Box>
                <Wrapper>
                  <DropWrapper onDrop={onDrop} step={step}>
                    {appsData.results
                      ?.filter((i) => i?.step === step)
                      .map((i, idx) => renderCard(i, idx, step))}
                  </DropWrapper>
                </Wrapper>
              </Column>
            ))}
          </Container>
        )}

        <CommonModal
          open={openModal === "cancel-alert"}
          handleClose={() => dispatch(handleClose())}
        >
          <Stack gap="25x" bgcolor="#fff" p="20px" borderRadius="10px">
            <CustomSelect
              width="230px"
              value={cancelId || ""}
              values={Data.cancel}
              onChange={onChangeSelect}
            />

            <FlexWrapper gap="17px" alignItems="center" mt="20px">
              <Text
                c="#6C6C6C"
                fs="20px"
                fw="700"
                onClick={() => dispatch(handleClose())}
                style={{ cursor: "pointer" }}
              >
                {t("common.cancel")}
              </Text>
              <CustomButton
                bgColor="var(--primary)"
                fs="20px"
                value="принять"
                color="#fff"
                type="button"
                width="123px"
                height="32px"
                padding="0"
                fw="700"
                onClick={() => onDrop(cancelReason)}
              />
            </FlexWrapper>
          </Stack>
        </CommonModal>

        <CommonModal
          open={openModal === "setPricing"}
          handleClose={() => dispatch(handleClose())}
          customStyled
        >
          <AddApplication
            isFillPricing
            handleClose={() => dispatch(handleClose())}
            onDrop={onDrop}
          />
        </CommonModal>

        <CommonModal open={stepLoading} handleClose={() => {}}>
          <Box width="100px" height="100px">
            <FadingBalls color="#fff" width="70px" duration="0.4s" />
          </Box>
        </CommonModal>

        <Pagination
          sx={{
            position: "absolute",
            bottom: "15px",
            right: "15px",
          }}
          count={
            Math.floor(appsData?.count / 20) + (appsData?.count % 20 && 1) || 1
          }
          page={Number(query.get("page")) || 1}
          onChange={(e, value) => {
            navigate(`${pathname}${UseReplace("page", String(value))}`);
          }}
          color="primary"
        />
      </Box>
    </DndProvider>
  );
};

export default Applications;
