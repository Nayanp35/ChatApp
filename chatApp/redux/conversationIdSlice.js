import { createSlice } from "@reduxjs/toolkit";

const conversationIdSlice = createSlice({
  name: "conversationId",
  initialState: "",
  reducers: {
    setConversationId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setConversationId } = conversationIdSlice.actions;

export default conversationIdSlice.reducer;