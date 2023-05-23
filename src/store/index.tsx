import { configureStore } from "@reduxjs/toolkit";
import applicationsSlice from "./slices/applicationsSlice";
import contactSlice from "./slices/contactSlice";
import employeesSlice from "./slices/employeesSlice";
import mainSlice from "./slices/mainSlice";
import settingsSlice from "./slices/settingsSlice";
import processSlice from "./slices/processSlice";
import statisticsSlice from "./slices/statisticsSlice";

const store = configureStore({
  reducer: {
    main: mainSlice,
    settings: settingsSlice,
    contact: contactSlice,
    employees: employeesSlice,
    applications: applicationsSlice,
    process: processSlice,
    statistics: statisticsSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
