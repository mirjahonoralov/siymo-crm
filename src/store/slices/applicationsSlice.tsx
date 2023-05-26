import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  cancelNotificationThunk,
  createApplicationThunk,
  createApplicationWithClientThunk,
  deleteApplicationThunk,
  editApplicationObject,
  editApplicationThunk,
  getApplications,
  getNotifications,
  postOrderApplicationStepThunk,
  postOrderApplicationThunk,
} from "../actions/applicationsActions";
import { settingsDataT } from "./settingsSlice";

export type appT = {
  id?: number;
  number: string;
  price: string;
  price2: string;
  job: settingsDataT | null;
  work: settingsDataT | null;
};

export type appsDataT = {
  // image: string;
  index?: number;
  id: number;
  step_id: number;
  reason: string;
  applications: appT[];
  phone_number: string;
  telegram: string;
  created_at: string;
  step: string;
  client: {
    image: string;
    id: string;
    name: string;
    name_uz: string;
    name_ru: string;
    phone_number: string;
    telegram: string;
    created_at: string;
    updated_at: string;
    activity: {
      id: number;
      name: string;
      name_uz: string;
      name_ru: string;
    };
  };
  survey: {
    id: number;
    name: string;
    name_uz: string;
    name_ru: string;
  };
  manager: {
    id: 1;
    first_name: string;
    last_name: string;
  };
  person_contact: string;
};

export type appsDataType = { count: number; results: appsDataT[] };

export type notificationT = {
  id: number;
  name: string;
  is_accepted: boolean;
  created_at: string;
  phone_number: string;
  client: number | null;
  telegram: string;
  activity: {
    id: number;
    name: string;
  };
  work: {
    id: number;
    name: string;
    type_of_job: number;
  };
  // manager: {
  //   id: number;
  //   first_name: string;
  //   last_name: string;
  // };
  // reason: {
  //   name: string;
  // };
};

export type onDropT = {
  item: appsDataT;
  monitor: any;
  step: string;
};

const initialState = {
  appsData: { count: 0, results: [] } as appsDataType,
  openModal: "",
  pending: false,
  applicationsPending: false,
  notificationsPending: false,
  actionsPending: "",
  cancelReason: {} as onDropT,
  fillPricingData: null as onDropT | null,
  notifications: [] as notificationT[],
  notificationId: null as number | null,
  exceptedNotification: null as notificationT | null,
  editingApp: null as appsDataT | null,
  indicator: "",
  selectedItems: [] as number[],
  isChangedAppObject: false,
  cannotEditApp: false,
};

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    handleOpen: (state, action: PayloadAction<string>) => {
      state.openModal = action.payload;
    },
    handleClose: (state) => {
      state.openModal = "";
      state.cannotEditApp = false;
    },
    setAppsData: (state, action: PayloadAction<appsDataType>) => {
      state.appsData = action.payload;
    },
    setCancelReason: (state, action: PayloadAction<onDropT>) => {
      state.cancelReason = action.payload;
    },
    setFillPricingData: (state, action: PayloadAction<onDropT>) => {
      state.fillPricingData = action.payload;
    },
    setNotification: (state, action: PayloadAction<notificationT | null>) => {
      state.exceptedNotification = action.payload;
    },

    setEditingApp: (state, action: PayloadAction<appsDataT | null>) => {
      state.editingApp = action.payload;
      if (
        action.payload?.step === "cancelled" ||
        action.payload?.step === "finish"
      )
        state.cannotEditApp = true;
    },
    setSelectedItems: (state, action: PayloadAction<number>) => {
      const selectedId = action.payload;
      let ids = state.selectedItems;

      if (ids.includes(selectedId)) ids = ids.filter((i) => i !== selectedId);
      else ids.push(selectedId);
      state.selectedItems = ids;

      if (ids.length > 0) {
        if (ids.length > 1) state.indicator = "delete";
        else state.indicator = "delete edit";
      } else state.indicator = "";
    },

    setIsChangedAppObject: (state) => {
      state.isChangedAppObject = false;
    },
  },
  extraReducers: {
    [(getApplications as any).pending]: (state) => {
      state.pending = true;
      state.applicationsPending = true;
    },
    [(getApplications as any).fulfilled]: (
      state,
      action: PayloadAction<appsDataType>
    ) => {
      state.pending = false;
      state.appsData = action.payload;
      state.applicationsPending = false;
    },

    [(getNotifications as any).pending]: (state) => {
      state.notificationsPending = true;
    },
    [(getNotifications as any).fulfilled]: (
      state,
      action: PayloadAction<notificationT[]>
    ) => {
      state.notifications = action.payload;
      state.notificationsPending = false;
    },

    [(createApplicationThunk as any).pending]: (state) => {
      state.actionsPending = "post-application";
    },
    [(createApplicationThunk as any).fulfilled]: (
      state,
      action: PayloadAction<appsDataT>
    ) => {
      const data = action.payload;
      if (data.id) {
        state.appsData.results.unshift(data);
        state.appsData.count++;
      }

      state.actionsPending = "";
      state.openModal = "";
    },

    [(createApplicationWithClientThunk as any).pending]: (state) => {
      state.actionsPending = "post-application";
    },
    [(createApplicationWithClientThunk as any).fulfilled]: (
      state,
      action: PayloadAction<appsDataT>
    ) => {
      const data = action.payload;

      if (data.id) {
        state.appsData.results.unshift(data);
        state.appsData.count++;
      }

      state.actionsPending = "";
      state.openModal = "";
    },

    [(editApplicationThunk as any).pending]: (state) => {
      state.actionsPending = "post-application";
    },
    [(editApplicationThunk as any).fulfilled]: (
      state,
      action: PayloadAction<appsDataT>
    ) => {
      const data = action.payload;

      if (data.id) {
        const editingItem = data;
        const items = state.appsData.results;

        const index = items.findIndex((item) => item.id === editingItem.id);
        items.splice(index, 1, editingItem);
        state.appsData = { ...state.appsData, results: items };

        state.editingApp = null;
        state.actionsPending = "";
        state.openModal = "";
      }

      state.actionsPending = "";
    },

    [(deleteApplicationThunk as any).pending]: (state) => {
      state.actionsPending = "delete-process";
    },
    [(deleteApplicationThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action?.payload?.status === "success") {
        let ids = state.selectedItems;
        let items = state.appsData.results;

        ids.forEach((selectedId) => {
          items = items.filter((item) => item.id !== selectedId);
        });

        state.appsData = {
          results: items,
          count: state.appsData.count - ids.length,
        };
        state.selectedItems = [];
        state.indicator = "";
      }

      state.actionsPending = "";
    },

    [(postOrderApplicationThunk as any).pending]: (state) => {
      state.actionsPending = "post-order";
    },
    [(postOrderApplicationThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action.payload?.status === "success") state.actionsPending = "";
    },

    [(postOrderApplicationStepThunk as any).pending]: (state) => {
      state.actionsPending = "post-step";
    },
    [(postOrderApplicationStepThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action.payload?.status === "success") state.actionsPending = "";
    },

    [(cancelNotificationThunk as any).pending]: (state) => {
      state.actionsPending = "cancel-notification";
    },
    [(cancelNotificationThunk as any).fulfilled]: (
      state,
      action: PayloadAction<notificationT>
    ) => {
      const data = action.payload;
      const notifications = state.notifications;

      if (data.id) {
        state.notifications = notifications.filter(
          (item) => item.id !== data.id
        );
        state.actionsPending = "";
      }
    },

    [(editApplicationObject as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action.payload.status === "success") state.isChangedAppObject = true;
    },
  },
});

export const {
  handleOpen,
  handleClose,
  setAppsData,
  setCancelReason,
  setEditingApp,
  setNotification,
  setSelectedItems,
  setIsChangedAppObject,
  setFillPricingData,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
