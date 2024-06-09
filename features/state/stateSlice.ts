import { Choice } from "@/constants/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Choice = {
  id: 0,
  value: "Choose state",
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Choice>) => {
      state.id = action.payload.id;
      state.value = action.payload.value;
    },
  },
});

export const { setState } = stateSlice.actions;

export default stateSlice.reducer;
