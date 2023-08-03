import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import currentUserSlice from "./currentUserSlice";
import chatMessagesSlice from "./chatMessagesSlice";
import conversationIdSlice from "./conversationIdSlice";
import receiverIdSlice from "./receiverIdSlice";
import usersSlice from "./usersSlice";

const rootReducer = combineReducers({
  currentUser: currentUserSlice,
  conversationId: conversationIdSlice,
  chatMessages: chatMessagesSlice,
  users: usersSlice,
  receiverId: receiverIdSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
