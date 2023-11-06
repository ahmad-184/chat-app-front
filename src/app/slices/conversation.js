import { createSlice } from "@reduxjs/toolkit";
// import { enqueueSnackbar } from "notistack";

const initialState = {
  chat_conversation: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_conversation: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
};

const conversationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default conversationSlice.reducer;
