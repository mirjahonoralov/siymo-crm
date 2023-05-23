import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTypes,
  deleteTypeThunk,
  createTypeThunk,
  editTypeThunk,
  getProfileThunk,
  editProfileThunk,
} from "../actions/settingsActions";
import { employeeType } from "./employeesSlice";

export type settingsDataT = {
  name: string;
  id: number;
};

type workTypeT = {
  name: string;
  id: number;
  type_of_job: number;
};

export type dataTypeT =
  | "workTypes"
  | "jobTypes"
  | "activities"
  | "clientTypes"
  | "about"
  | "cancel";

const initialState = {
  profile: {
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    role: "",
    password2: "",
    id: null,
  } as employeeType,
  Data: {
    jobTypes: [] as settingsDataT[],
    workTypes: [] as workTypeT[],
    activities: [] as settingsDataT[],
    clientTypes: [] as settingsDataT[],
    about: [] as settingsDataT[],
    cancel: [] as settingsDataT[],
  },
  selectedItems: [] as number[],
  newTypeName: "",
  openModal: false,
  indicator: "",
  editingItem: {} as settingsDataT | workTypeT,
  pending: false,
  actionsPending: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.openModal = true;
    },
    handleClose: (state) => {
      state.openModal = false;
    },

    setSelectedItems: (state, action: PayloadAction<number>) => {
      const selectedId = action.payload;
      let ids = state.selectedItems;

      if (ids.includes(selectedId)) ids = ids.filter((i) => i !== selectedId);
      else ids.push(action.payload);

      state.selectedItems = ids;

      if (ids.length > 0) {
        if (ids.length > 1) state.indicator = "delete";
        else state.indicator = "delete edit";
      } else state.indicator = "";
    },

    setIndicator: (state, action: PayloadAction<string>) => {
      state.indicator = action.payload;
    },

    setNewTypeName: (state, action: PayloadAction<string>) => {
      state.newTypeName = action.payload;
    },

    setEditingItem: (state, action: PayloadAction<settingsDataT>) => {
      state.editingItem = action.payload;
    },

    emptyCheckedItems: (state) => {
      state.selectedItems = [];
    },

    emptyData: (state, action: PayloadAction<dataTypeT>) => {
      state.Data[action.payload] = [];
    },

    emptyRole: (state) => {
      state.profile = { ...state.profile, role: "" };
    },
  },
  extraReducers: {
    [(getProfileThunk as any).pending]: (state) => {
      state.pending = true;
    },
    [(getProfileThunk as any).fulfilled]: (
      state,
      action: PayloadAction<employeeType>
    ) => {
      state.profile = action.payload;
      state.pending = false;
    },

    [(editProfileThunk as any).pending]: (state) => {
      state.actionsPending = "editing-profile";
    },
    [(editProfileThunk as any).fulfilled]: (
      state,
      action: PayloadAction<employeeType>
    ) => {
      state.profile = {
        ...action.payload,
        password2: action.payload.password2,
      };
      state.actionsPending = "";
    },

    [(getTypes as any).pending]: (state) => {
      state.pending = true;
    },
    [(getTypes as any).fulfilled]: (
      state,
      action: PayloadAction<{ data: any; dataType: dataTypeT }>
    ) => {
      const { data, dataType } = action.payload;
      state.pending = false;

      state.Data[dataType] = data;
    },

    [(createTypeThunk as any).pending]: (state) => {
      state.actionsPending = "create";
    },
    [(createTypeThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ data: any; dataType: dataTypeT }>
    ) => {
      const { dataType, data } = action.payload;

      state.Data[dataType].unshift(data);

      state.newTypeName = "";
      state.openModal = false;
      state.actionsPending = "";
    },

    [(deleteTypeThunk as any).pending]: (state) => {
      state.actionsPending = "delete";
    },
    [(deleteTypeThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: boolean; dataType?: dataTypeT }>
    ) => {
      const { dataType } = action.payload;

      if (action?.payload?.status === true) {
        let ids = state.selectedItems;
        let items = state.Data[dataType!];

        ids.forEach((selectedId) => {
          items = items.filter((item) => item.id !== selectedId);
        });

        // @ts-ignore
        state.Data[dataType!] = items;
        state.selectedItems = [];
      }

      state.actionsPending = "";
    },

    [(editTypeThunk as any).pending]: (state) => {
      state.actionsPending = "edit";
    },
    [(editTypeThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ data: any; dataType: dataTypeT }>
    ) => {
      const { dataType, data } = action.payload;

      if (data.id) {
        const editingItem = data;
        const items = state.Data[dataType];
        const index = items.findIndex((item) => item.id === editingItem.id);
        items.splice(index, 1, editingItem);

        state.Data[dataType!] = items as any;
        state.newTypeName = "";
        state.openModal = false;
      }

      state.actionsPending = "";
    },
  },
});

export const {
  handleClose,
  handleOpen,
  setNewTypeName,
  setEditingItem,
  setIndicator,
  emptyCheckedItems,
  setSelectedItems,
  emptyData,
  emptyRole,
} = settingsSlice.actions;
export default settingsSlice.reducer;
