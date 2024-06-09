import { Choice } from "@/constants/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Choice = {
  id: 0,
  value: "Choose field",
};

export const fieldSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setFlied: (state, action: PayloadAction<Choice>) => {
      state.id = action.payload.id;
      state.value = action.payload.value;
    },
  },
});

export const { setFlied } = fieldSlice.actions;

export default fieldSlice.reducer;
