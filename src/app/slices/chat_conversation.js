import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

import { fetchChatConversationsApi, fetchMessagesApi } from "../../services";

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

export const fetchMessagesThunk = createAsyncThunk(
  "chat_conversation/fetchMessagesThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetchMessagesApi(data);
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
      const { friend_id, friend_status, lastSeen } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item.friend_id === friend_id
      );
      if (state.conversations[conversationIndex]) {
        state.conversations[conversationIndex] = {
          ...state.conversations[conversationIndex],
          status: friend_status,
          lastSeen,
        };
        if (
          state.current_conversation &&
          state.current_conversation.friend_id === friend_id
        )
          state.current_conversation.status = friend_status;
        state.current_conversation.lastSeen = lastSeen;
      }
    },
    updateTypingStatus(state, action) {
      const { conversation_id, typing_status } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conversation_id
      );
      state.conversations[conversationIndex].typing = typing_status;
      if (state.current_conversation._id === conversation_id) {
        state.current_conversation.typing = typing_status;
      }
    },
    setMessageDelivered(state, action) {
      const message = action.payload;
      conversationAdaptor.setOne(state, message);
    },
    setMessageSeen(state, action) {
      conversationAdaptor.upsertOne(state, {
        _id: action.payload,
        status: "Seen",
      });
    },
    addUnseenMsg(state, action) {
      const { msg_id, conv_id } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conv_id
      );
      state.conversations[conversationIndex].unseen.push(msg_id);
    },
    removeUnseenMsg(state, action) {
      const { msg_id, conv_id } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conv_id
      );
      state.conversations[conversationIndex].unseen = state.conversations[
        conversationIndex
      ].unseen.filter((item) => item !== msg_id);
    },
    addMessage(state, action) {
      const message = action.payload;
      conversationAdaptor.addOne(state, message);
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === message.conversation_id
      );
      state.conversations[conversationIndex].last_message = message;
    },
    changeLastMessage(state, action) {
      const message = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === message.conversation_id
      );
      state.conversations[conversationIndex].last_message = message;
    },
    changeToFirstConversation(state, action) {
      const conversation_id = action.payload;
      const firstConv = state.conversations[0];
      if (firstConv._id === conversation_id) return;
      let array = [];
      for (let conv of state.conversations) {
        if (conv._id === conversation_id) {
          array = [conv, ...array];
        } else array.push(conv);
      }
      console.log(array);
      console.log("array");
      state.conversations = array;
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
        state.conversations = [...data];
        if (state.current_conversation) {
          const currentConversationIndex = state.conversations.findIndex(
            (item) => item._id === state.current_conversation._id
          );
          state.current_conversation =
            state.conversations[currentConversationIndex];
        }
      }
    },
    [fetchConversationsThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        enqueueSnackbar(message, { variant: "error" });
      }
    },
    [fetchMessagesThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchMessagesThunk.fulfilled]: (state, action) => {
      const { data, status, ordered_message_list } = action.payload.data;
      state.loading = false;
      if (status === 200) {
        conversationAdaptor.setAll(state, data);
      }
    },
    [fetchMessagesThunk.rejected]: (state, action) => {
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
  updateTypingStatus,
  addMessage,
  changeLastMessage,
  setMessageDelivered,
  setMessageSeen,
  removeUnseenMsg,
  addUnseenMsg,
  changeToFirstConversation,
} = conversationSlice.actions;

export const { selectAll: getAllMessages } = conversationAdaptor.getSelectors(
  (state) => state.chat_conversation
);

export const getChatConversations = (state) =>
  state.chat_conversation.conversations;
export const getCurrentConversation = (state) =>
  state.chat_conversation.current_conversation;

export default conversationSlice.reducer;
