import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchChatConversationsApi } from "../../services";

const conversationAdaptor = createEntityAdapter({
  selectId: (item) => item._id,
});

const initialState = conversationAdaptor.getInitialState({
  loading: false,
  conversations: [],
  current_conversation: null,
});

export const fetchConversationsThunk = createAsyncThunk(
  "chat_conversation/fetchConversations",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetchChatConversationsApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const conversationSlice = createSlice({
  name: "chat_conversation",
  initialState,
  reducers: {
    logOut(state) {
      state.conversations = [];
      state.current_conversation = null;
      conversationAdaptor.removeAll(state);
    },
    updateChatConversations(state, action) {
      state.conversations = [...action.payload];
      if (state.current_conversation) {
        const currentConversationIndex = state.conversations.findIndex(
          (item) => item._id === state.current_conversation._id
        );
        state.current_conversation =
          state.conversations[currentConversationIndex];
      }
    },
    startNewChatConversation(state, action) {
      const { conversation, messages } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conversation._id
      );
      state.conversations[conversationIndex] = { ...conversation };
      state.current_conversation = conversation;
      conversationAdaptor.upsertMany(state, messages);
    },
    startChatConversation(state, action) {
      const currentConversationIndex = state.conversations.findIndex(
        (item) => item._id === action.payload
      );
      state.current_conversation =
        state.conversations[currentConversationIndex];
    },
    addChatConversation(state, action) {
      const existing_conversation = state.conversations.find(
        (item) => item._id === action.payload._id
      );
      if (!existing_conversation) {
        state.conversations.push(action.payload);
      }
    },
    updateChatConversationsStatus(state, action) {
      const { friend_id, friend_status } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item.friend_id === friend_id
      );
      if (state.conversations[conversationIndex]) {
        state.conversations[conversationIndex] = {
          ...state.conversations[conversationIndex],
          status: friend_status,
        };
        if (
          state.current_conversation &&
          state.current_conversation.friend_id === friend_id
        )
          state.current_conversation.status = friend_status;
      }
    },
  },
  extraReducers: {
    [fetchConversationsThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchConversationsThunk.fulfilled]: (state, action) => {
      const { data, status } = action.payload.data;
      state.loading = false;
      if (status === 200) {
        state.conversations = [...data.conversations];
      }
    },
    [fetchConversationsThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        enqueueSnackbar(message, { variant: "error" });
      }
    },
  },
});

export const {
  logOut: logOutChatConv,
  startNewChatConversation,
  updateChatConversations,
  addChatConversation,
  startChatConversation,
  updateChatConversationsStatus,
} = conversationSlice.actions;

export const getChatConversations = (state) =>
  state.chat_conversation.conversations;
export const getCurrentConversation = (state) =>
  state.chat_conversation.current_conversation;

export default conversationSlice.reducer;
