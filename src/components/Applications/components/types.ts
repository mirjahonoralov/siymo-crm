import { SelectChangeEvent } from "@mui/material";
import { settingsDataT } from "../../../store/slices/settingsSlice";

export type appType = {
  about: settingsDataT | null;
  client: number | null;
  work?: {
    id: number;
    name: string;
    type_of_job: number;
  };
};

export type onChangeAppType = {
  e: SelectChangeEvent;
  name: string;
  type: "jobTypes" | "workTypes" | "about";
};
