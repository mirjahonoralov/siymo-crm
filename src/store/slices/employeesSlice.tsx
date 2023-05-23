import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmployeeThunk,
  deleteEmployeeThunk,
  editEmployeeThunk,
  getEmployeeActions,
  getEmployees,
} from "../actions/employeesActions";
import { appT } from "./applicationsSlice";

export type employeeType = {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  role: string;
  password2: string;
  id: number | null;
};

export type employeeDataType = { count: number; results: employeeType[] };

export type employeePostType = {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  role: string;
  password2: string;
};

export type postDataType = {
  name: string;
  telegram: string;
  phone_number: string;
  activity: number | null;
  id?: number;
};

type stepActionT = {
  step: string;
  created_at: string;
};

export type employeeActionT = {
  id: 2;
  applications: appT[];
  company: string;
  phone_number: string;
  telegram: string;
  created_at: string;
  steps: stepActionT[];
  survey: {
    id: 1;
    name: string;
  };
  manager: {
    id: 1;
    first_name: string;
    last_name: string;
  };
  total_price: 2000;
  step: string;
};

type selectedEmployeeT = {
  manager: {
    id: 3;
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    telegram: string;
    role: string;
    password2: string;
  } | null;
  actions: employeeActionT[];
};

const initialState = {
  data: {} as employeeDataType,
  pending: false,
  actionsPending: "",
  openModal: "",
  selectedItems: [] as number[],
  editingItem: {} as employeeType | null,
  indicator: "",
  selectedEmployee: {} as selectedEmployeeT,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    handleOpen: (state, action: PayloadAction<string>) => {
      state.openModal = action.payload;
    },
    handleClose: (state) => {
      state.openModal = "";
      state.editingItem = null;
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
    setEditingItem: (state, action: PayloadAction<employeeType>) => {
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
    [(getEmployees as any).pending]: (state) => {
      state.pending = true;
    },
    [(getEmployees as any).fulfilled]: (
      state,
      action: PayloadAction<employeeDataType>
    ) => {
      state.data = action.payload;
      state.openModal = "";
      state.pending = false;
    },

    [(createEmployeeThunk as any).pending]: (state) => {
      state.actionsPending = "adding";
    },
    [(createEmployeeThunk as any).fulfilled]: (
      state,
      action: PayloadAction<employeeType>
    ) => {
      const data = action.payload;
      if (data.id) {
        state.data.results.unshift(data);
        state.data.count++;
      }

      state.actionsPending = "";
      state.openModal = "";
    },

    [(deleteEmployeeThunk as any).pending]: (state) => {
      state.actionsPending = "delete";
    },
    [(deleteEmployeeThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action?.payload?.status === "success") {
        let ids = state.selectedItems;
        let items = state.data.results;

        items = items.filter((item) => item.id !== ids[0]);

        state.data = { results: items, count: state.data.count++ };
        state.selectedItems = [];
      }

      state.actionsPending = "";
    },

    [(editEmployeeThunk as any).pending]: (state) => {
      state.actionsPending = "edit";
    },
    [(editEmployeeThunk as any).fulfilled]: (
      state,
      action: PayloadAction<employeeType>
    ) => {
      const data = action.payload;

      if (data.id) {
        const editingItem = data;
        const items = state.data.results;

        const index = items.findIndex((item) => item.id === editingItem.id);
        items.splice(index, 1, editingItem);
        state.data = { ...state.data, results: items };

        state.editingItem = null;
        state.openModal = "";
      }

      state.actionsPending = "";
    },

    [(getEmployeeActions as any).pending]: (state) => {
      state.actionsPending = "employee-actions";
    },
    [(getEmployeeActions as any).fulfilled]: (
      state,
      action: PayloadAction<selectedEmployeeT>
    ) => {
      state.selectedEmployee = action.payload;
      state.actionsPending = "";
    },
  },
});

export const {
  handleOpen,
  handleClose,
  setSelectedItems,
  setEditingItem,
  emptyCheckedItems,
  setIndicator,
} = employeesSlice.actions;
export default employeesSlice.reducer;
