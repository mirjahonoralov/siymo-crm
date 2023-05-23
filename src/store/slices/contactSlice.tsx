import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createContactThunk,
  deleteContactThunk,
  editContactThunk,
  getContact,
  getContactActions,
  getContactById,
} from "../actions/contactActions";
import { appT } from "./applicationsSlice";

export type dataType = {
  id: number | null;
  name: string;
  phone_number: string;
  telegram: string;
  created_at: string;
  activity: { id: number; name: string } | null;
  person_contact: string;
  image: string;
};

export type contactDataType = { count: number; results: dataType[] };

export type postDataType = {
  name: string;
  telegram: string;
  phone_number: string;
  activity: { id: number; name: string } | null;
  id?: number;
  image: File | string | null;
};

type stepActionT = {
  step: string;
  created_at: string;
};

export type contactActionT = {
  id: 2;
  applications: appT[];
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

export type selectedContactT = {
  client: {
    id: 3;
    name: string;
    phone_number: string;
    telegram: string;
    created_at: string;
    updated_at: string;
    activity: {
      id: 2;
      name: string;
    };
  } | null;

  actions: contactActionT[] | null;
};

const initialState = {
  data: {} as contactDataType,
  contactById: null as dataType | null,
  pending: false,
  actionsPending: "",
  openModal: "",
  selectedItems: [] as number[],
  editingItem: {} as dataType,
  indicator: "",
  selectedContact: {} as selectedContactT,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    handleOpen: (state, action: PayloadAction<string>) => {
      state.openModal = action.payload;
    },
    handleClose: (state) => {
      state.openModal = "";
      state.editingItem = {
        name: "",
        telegram: "",
        phone_number: "",
        activity: null,
        created_at: "",
        id: null,
        person_contact: "",
        image: "",
      };
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
    setEditingItem: (state, action: PayloadAction<dataType>) => {
      state.editingItem = action.payload;
    },
    emptyCheckedItems: (state) => {
      state.selectedItems = [];
    },
    setIndicator: (state, action: PayloadAction<string>) => {
      state.indicator = action.payload;
    },
    emptyContactById: (state) => {
      state.contactById = null;
    },
  },
  extraReducers: {
    [(getContact as any).pending]: (state) => {
      state.pending = true;
    },
    [(getContact as any).fulfilled]: (
      state,
      action: PayloadAction<contactDataType>
    ) => {
      state.data = action.payload;
      state.openModal = "";
      state.pending = false;
    },

    [(getContactById as any).fulfilled]: (
      state,
      action: PayloadAction<dataType>
    ) => {
      state.contactById = action.payload;
    },

    [(createContactThunk as any).pending]: (state) => {
      state.actionsPending = "adding";
    },
    [(createContactThunk as any).fulfilled]: (
      state,
      action: PayloadAction<dataType>
    ) => {
      const data = action.payload;

      if (data.id) {
        state.data.results.unshift(data);
        state.data.count++;
      }

      state.actionsPending = "";
      state.openModal = "";
    },

    [(deleteContactThunk as any).pending]: (state) => {
      state.actionsPending = "delete";
    },
    [(deleteContactThunk as any).fulfilled]: (
      state,
      action: PayloadAction<{ status: string }>
    ) => {
      if (action?.payload?.status === "success") {
        let ids = state.selectedItems;
        let items = state.data.results;

        ids.forEach((selectedId) => {
          items = items.filter((item) => item.id !== selectedId);
        });

        state.data = { results: items, count: state.data.count - ids.length };
        state.selectedItems = [];
      }

      state.actionsPending = "";
    },

    [(editContactThunk as any).pending]: (state) => {
      state.actionsPending = "edit";
    },
    [(editContactThunk as any).fulfilled]: (
      state,
      action: PayloadAction<dataType>
    ) => {
      const data = action.payload;

      if (data.id) {
        const editingItem = data;
        const items = state.data.results;

        const index = items.findIndex((item) => item.id === editingItem.id);
        items.splice(index, 1, editingItem);
        state.data = { ...state.data, results: items };

        state.editingItem = {
          name: "",
          telegram: "",
          phone_number: "",
          activity: null,
          created_at: "",
          id: null,
          person_contact: "",
          image: "",
        };
        state.actionsPending = "";
        state.openModal = "";
      }

      state.actionsPending = "";
    },

    [(getContactActions as any).pending]: (state) => {
      state.actionsPending = "contact-actions";
    },
    [(getContactActions as any).fulfilled]: (
      state,
      action: PayloadAction<selectedContactT>
    ) => {
      state.selectedContact = action.payload;
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
  emptyContactById,
} = contactSlice.actions;
export default contactSlice.reducer;
