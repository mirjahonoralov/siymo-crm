import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProcessThunk,
  deleteProcessThunk,
  editProcessThunk,
  getProcessManagersThunk,
  getProcessThunk,
} from "../actions/processActions";
import { managerT } from "./mainSlice";

export type clientDataT = {
  name: string;
  telegram: string;
  activity: { name: string; id: number } | null;
};

export type managersDataType = { count: number; results: managerT[] };

export type processT = {
  id: number;
  name: string;
  created_at: string;
  activity: {
    id: number;
    name: string;
  };
  manager: {
    id: number;
    first_name: string;
    last_name: string;
  };
  work: {
    id: number;
    name: string;
    type_of_job: number;
  };
};

export type processDataType = { count: number; results: processT[] };

export type processPostT = {
  client: number | null;
  manager: number | null;
  name: string;
  activity: {
    id: number;
    name: string;
  } | null;
  work: {
    id: number;
    name: string;
  } | null;
  logo?: string | null;
  phone_number?: string | null;
};

const initialState = {
  processManagers: { count: 0, results: [] } as managersDataType,
  processData: { count: 0, results: [] } as processDataType,
  openModal: "",
  pending: false,
  actionsPending: "",
  selectedItems: [] as number[],
  editingItem: null as processPostT | null,
  indicator: "",
  selectedManager: {},
};

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    handleOpen: (state, action: PayloadAction<string>) => {
      state.openModal = action.payload;
    },
    handleClose: (state) => {
      state.openModal = "";
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
    setEditingItem: (state, action: PayloadAction<processPostT>) => {
      state.editingItem = action.payload;
    },
    emptyCheckedItems: (state) => {
      state.selectedItems = [];
    },
    setIndicator: (state, action: PayloadAction<string>) => {
      state.indicator = action.payload;
    },
  },
  extraReducers: {
    [(getProcessThunk as any).pending]: (state) => {
      state.pending = true;
    },
    [(getProcessThunk as any).fulfilled]: (
      state,
      action: PayloadAction<processDataType>
    ) => {
      state.pending = false;
      state.processData = action.payload;
    },

    [(getProcessManagersThunk as any).pending]: (state) => {
      state.pending = true;
    },
    [(getProcessManagersThunk as any).fulfilled]: (
      state,
      action: PayloadAction<managersDataType>
    ) => {
      state.pending = false;
      state.processManagers = action.payload;
    },

    // [(getProcessThunk as any).pending]: (state) => {
    //   state.pending = true;
    // },
    // [(getProcessThunk as any).fulfilled]: (
    //   state,
    //   action: PayloadAction<managersDataType>
    // ) => {
    //   state.pending = false;
    //   state.processManagers = action.payload;
    // },

    [(createProcessThunk as any).pending]: (state) => {
      state.actionsPending = "add-process";
    },
    [(createProcessThunk as any).fulfilled]: (
      state,
      action: PayloadAction<processT>
    ) => {
      const data = action.payload;
      if (data.id) {
        state.processData.results.unshift(data);
        state.processData.count++;
      }

      state.openModal = "";
      state.actionsPending = "";
    },

    [(editProcessThunk as any).pending]: (state) => {
      state.actionsPending = "add-process";
    },
    [(editProcessThunk as any).fulfilled]: (
      state,
      action: PayloadAction<processT>
    ) => {
      const data = action.payload;

      if (data.id) {
        const editingItem = data;
        const items = state.processData.results;

        const index = items.findIndex((item) => item.id === editingItem.id);
        items.splice(index, 1, editingItem);
        state.processData = { ...state.processData, results: items };

        state.editingItem = null;
        state.openModal = "";
      }
      state.actionsPending = "";
    },

    [(deleteProcessThunk as any).pending]: (state) => {
      state.actionsPending = "delete-process";
    },
    [(deleteProcessThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action?.payload?.status === "success") {
        let ids = state.selectedItems;
        let items = state.processData.results;

        ids.forEach((selectedId) => {
          items = items.filter((item) => item.id !== selectedId);
        });

        state.processData = {
          results: items,
          count: state.processData.count - ids.length,
        };
        state.selectedItems = [];
        state.indicator = "";
      }

      state.actionsPending = "";
    },
  },
});

export const {
  handleOpen,
  handleClose,
  emptyCheckedItems,
  setSelectedItems,
  setEditingItem,
  setIndicator,
} = processSlice.actions;
export default processSlice.reducer;
