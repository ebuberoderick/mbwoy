import { createSlice } from "@reduxjs/toolkit";

export const preUserSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
  },
  reducers: {
    addPreuser: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { addPreuser } = preUserSlice.actions;

export default preUserSlice.reducer;
