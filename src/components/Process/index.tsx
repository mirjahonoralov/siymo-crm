import { useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import MainLoading from "../MainLoading";
import Card from "./components/Card";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getProcessManagersThunk,
  getProcessThunk,
} from "../../store/actions/processActions";
import useSearch from "../../hooks/useSearch";
import { useLocation, useNavigate } from "react-router-dom";
import UseReplace from "../../hooks/useReplace";
import SelectedProcess from "./components/SelectedProcess";

const Process = () => {
  const { pending, processManagers, actionsPending } = useAppSelector(
    (state) => state.process
  );

  const dispatch = useAppDispatch();
  const query = useSearch();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/process" && !search)
      dispatch(getProcessManagersThunk(query));
    if (query.get("ordering") || query.get("search-name"))
      dispatch(getProcessManagersThunk(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);

  useEffect(() => {
    if (query.get("manager")) dispatch(getProcessThunk(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("manager")]);

  useEffect(() => {
    if (query.get("page")) dispatch(getProcessManagersThunk(query));
    if (!query.get("page")) navigate(`${pathname}${UseReplace("page", "1")}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("page")]);

  // if (pending) return <MainLoading />;

  return (
    <Stack gap="20px" position="relative" height="100%">
      <Header />
      {query.get("manager") ? (
        actionsPending === "contact-actions" ? (
          <MainLoading />
        ) : (
          <SelectedProcess
            manager={
              processManagers.results.find(
                (item) => item.id === +query.get("manager")!
              )!
            }
          />
        )
      ) : pending ? (
        <MainLoading />
      ) : (
        <>
          <Stack direction={"row"} flexWrap="wrap" gap="10px">
            {processManagers.results?.map((item) => (
              <Card data={item} key={item.id} />
            ))}
          </Stack>
        </>
      )}

      <Pagination
        sx={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
        }}
        count={
          Math.floor(processManagers?.count / 20) +
            (processManagers?.count % 20 && 1) || 1
        }
        page={Number(query.get("page")) || 1}
        onChange={(e, value) =>
          navigate(`${pathname}${UseReplace("page", String(value))}`)
        }
        color="primary"
      />
    </Stack>
  );
};

export default Process;
