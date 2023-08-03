import { createSlice } from "@reduxjs/toolkit";

const receiverIdSlice = createSlice({
  name: "receiverId",
  initialState: "",
  reducers: {
    setReceiverId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setReceiverId } = receiverIdSlice.actions;

export default receiverIdSlice.reducer;
