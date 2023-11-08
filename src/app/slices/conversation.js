import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
// import { enqueueSnackbar } from "notistack";

const conversationAdaptor = createEntityAdapter({
  selectId: (item) => item._id,
});

const initialState = conversationAdaptor.getInitialState({
  chat_conversation: {
    conversations: {},
    current_conversation: null,
    current_messages: {},
  },
  group_conversation: {
    conversations: {},
    current_conversation: null,
    current_messages: {},
  },
});

const conversationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default conversationSlice.reducer;
