import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import { errorToast } from "../../components/ToastProvider";

import {
  createMessageApi,
  fetchChatConversationsApi,
  fetchMessagesApi,
} from "../../services";
import filterByDate from "../../utils/filterByDate";

const conversationAdaptor = createEntityAdapter({
  selectId: (item) => item._id,
});

const initialState = conversationAdaptor.getInitialState({
  loading: false,
  error: false,
  currentPage: 0,
  nextPage: 1,
  hasNextPage: false,
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

export const fetchMoreMessageThunk = createAsyncThunk(
  "chat_conversation/fetchMoreMessageThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetchMessagesApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createMessageThunk = createAsyncThunk(
  "chat_conversation/createMessageThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createMessageApi(data);
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
      state.currentPage = 0;
      state.hasNextPage = true;
      state.nextPage = 1;
    },
    clearCurrentConversation(state) {
      state.current_conversation = null;
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
    setMessageDelivered(state, action) {
      const message = action.payload;
      conversationAdaptor.setOne(state, message);
    },
    addUnseenMsg(state, action) {
      const { msg_id, conv_id } = action.payload;
      const conversationIndex = state.conversations.findIndex(
        (item) => item._id === conv_id
      );
      state.conversations[conversationIndex].unseen.push(msg_id);
    },
    changeMessageStatus(state, action) {
      const { msg_id, conv_id } = action.payload;
      conversationAdaptor.upsertOne(state, {
        _id: msg_id,
        status: "Seen",
      });
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
    setMessageSeen(state, action) {
      const msg_id = action.payload;
      conversationAdaptor.upsertOne(state, {
        _id: msg_id,
        status: "Seen",
      });
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
      state.conversations = array;
    },
    removeConversation(state, action) {
      const conv_id = action.payload;
      state.conversations = state.conversations?.filter(
        (item) => item._id !== conv_id
      );
      state.current_conversation = null;
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
        errorToast(message);
      }
    },
    [fetchMessagesThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchMessagesThunk.fulfilled]: (state, action) => {
      const { data, status, currentPage, nextPage, hasNextPage } =
        action.payload.data;
      state.loading = false;
      if (status === 200) {
        if (state.error === true) state.error = false;
        const msgs = [...data].reverse();

        const items = filterByDate(msgs);

        state.currentPage = currentPage;
        state.nextPage = nextPage;
        state.hasNextPage = hasNextPage;
        conversationAdaptor.setAll(state, items);
      }
    },
    [fetchMessagesThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      state.error = true;
      if (error) {
        errorToast(message);
      }
    },
    [fetchMoreMessageThunk.fulfilled]: (state, action) => {
      const { data, status, currentPage, nextPage, hasNextPage } =
        action.payload.data;
      if (status === 200) {
        if (state.error === true) state.error = false;
        const msgs = [...data].reverse();

        let oldMsgsArr = [];
        for (let msg of Object.entries(current(state.entities))) {
          if (msg[1].type !== "timeline") oldMsgsArr.push(msg[1]);
        }

        const mergedItems = [...msgs, ...oldMsgsArr];

        const sortedItems = filterByDate(mergedItems);

        state.currentPage = currentPage;
        state.nextPage = nextPage;
        state.hasNextPage = hasNextPage;
        conversationAdaptor.setAll(state, sortedItems);
      }
    },
    [fetchMoreMessageThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.error = true;
      if (error) {
        errorToast(message);
      }
    },
  },
});

export const {
  logOut: logOutChatConv,
  startNewChatConversation,
  updateChatConversations,
  clearCurrentConversation,
  addChatConversation,
  startChatConversation,
  updateChatConversationsStatus,
  updateTypingStatus,
  addMessage,
  changeLastMessage,
  setMessageDelivered,
  addUnseenMsg,
  changeToFirstConversation,
  changeMessageStatus,
  setMessageSeen,
  removeConversation,
} = conversationSlice.actions;

export const { selectAll: getAllMessages } = conversationAdaptor.getSelectors(
  (state) => state.chat_conversation
);

export const getChatConversations = (state) =>
  state.chat_conversation.conversations;
export const getCurrentConversation = (state) =>
  state.chat_conversation.current_conversation;

export default conversationSlice.reducer;
