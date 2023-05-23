import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getStatistics,
  getStatisticsTypes,
} from "../actions/statisticsActions";

export type workT = {
  work__name: string;
  count: number;
};
export type jobT = {
  job__name: string;
  count: number;
};

export type jobWorkT = {
  works: workT[];
  jobs: jobT[];
};

const initialState = {
  pending: false,
  dashboardData: [] as number[],
  types: { jobs: [], works: [] } as jobWorkT,
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: {
    [(getStatistics as any).pending]: (state) => {
      state.pending = true;
    },
    [(getStatistics as any).fulfilled]: (state, action) => {
      state.pending = false;
      const data = [];
      for (let key in action.payload) {
        if (key !== "total") data.push(action.payload[key]);
      }
      state.dashboardData = data as number[];
    },

    // [(getStatisticsTypes as any).pending]: (state) => {
    //   state.pending = true;
    // },
    [(getStatisticsTypes as any).fulfilled]: (
      state,
      action: PayloadAction<jobWorkT>
    ) => {
      // state.pending = false;
      state.types = action.payload;
    },
  },
});

export const {} = statisticsSlice.actions;
export default statisticsSlice.reducer;
