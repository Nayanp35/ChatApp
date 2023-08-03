import { createSlice } from "@reduxjs/toolkit";

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState: [],
  reducers: {
    fetchMessages: (state, action) => {
      return action.payload;
    },
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { fetchMessages, addMessage } = chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
