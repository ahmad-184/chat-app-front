import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorToast } from "../../components/ToastProvider";

import { fetchChatConversationsApi } from "../../services";

const initialState = {
  loading: false,
  error: false,
  conversations: [],
  current_conversation: null,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversation/fetchConversations",
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
  name: "conversation",
  initialState,
  reducers: {
    logOut(state) {
      state.conversations = [];
      state.current_conversation = null;
    },
    startNewConversation(state, action) {
      const { conversation } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conversation._id
      );
      state.conversations[conversationIndex] = { ...conversation };
      state.current_conversation = conversation;
    },
    startConversation(state, action) {
      const currentConversationIndex = state.conversations.findIndex(
        (item) => item._id === action.payload
      );
      state.current_conversation =
        state.conversations[currentConversationIndex];
    },
    clearCurrentConversation(state) {
      state.current_conversation = null;
    },
    addConversation(state, action) {
      const existing_conversation = state.conversations.find(
        (item) => item._id === action.payload._id
      );
      if (!existing_conversation) {
        state.conversations.push(action.payload);
      }
    },
    updateConversationStatus(state, action) {
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
          state.current_conversation !== null &&
          state.current_conversation &&
          state.current_conversation.friend_id === friend_id
        ) {
          state.current_conversation.status = friend_status || "Offline";
          state.current_conversation.lastSeen = lastSeen || "..:..";
        }
      }
    },
    updateTypingStatus(state, action) {
      const { conversation_id, typing_status } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conversation_id
      );
      if (!state.conversations[conversationIndex]) return;
      state.conversations[conversationIndex].typing = typing_status;
      if (state.current_conversation?._id === conversation_id) {
        state.current_conversation.typing = typing_status;
      }
    },
    changeConversationUnseenMessage(state, action) {
      const { msg_id, conv_id } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conv_id
      );
      state.conversations[conversationIndex].unseen = state.conversations[
        conversationIndex
      ].unseen.filter((id) => id !== msg_id);
      if (state.current_conversation._id === conv_id) {
        state.current_conversation.unseen =
          state.conversations[conversationIndex].unseen;
      }
    },
    addUnseenMsg(state, action) {
      const { msg_id, conv_id } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conv_id
      );
      state.conversations[conversationIndex].unseen.push(msg_id);
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
      state.conversations = array;
    },
    removeConversation(state, action) {
      const conv_id = action.payload;
      state.conversations = state.conversations?.filter(
        (item) => item._id !== conv_id
      );
      state.current_conversation = null;
    },
    deleteConversationsLastMessage(state, action) {
      const message_id = action.payload;
      state.conversations.forEach((conv, index) => {
        if (conv?.last_message?._id === message_id) {
          state.conversations[index].last_message.deleted = true;
        }
      });
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
        errorToast({ message });
      }
    },
  },
});

export const {
  logOut: logOutChatConv,
  startNewConversation,
  clearCurrentConversation,
  addConversation,
  startConversation,
  updateConversationStatus,
  updateTypingStatus,
  changeLastMessage,
  changeToFirstConversation,
  removeConversation,
  addUnseenMsg,
  changeConversationUnseenMessage,
  deleteConversationsLastMessage,
} = conversationSlice.actions;

export const getCurrentConversation = (state) =>
  state.conversation.current_conversation;
export const getConversations = (state) => state.conversation.conversations;

export default conversationSlice.reducer;
