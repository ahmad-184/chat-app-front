import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import { errorToast } from "../../components/ToastProvider";

import {
  createMessageApi,
  deleteMessageApi,
  fetchMessagesApi,
  findReplayedMessageApi,
} from "../../services";
import filterByDate from "../../utils/filterByDate";

const messageAdaptor = createEntityAdapter({
  selectId: (item) => item._id,
});

const initialState = messageAdaptor.getInitialState({
  loading: false,
  fetchMoreLoading: false,
  error: false,
  currentPage: 0,
  nextPage: 1,
  hasNextPage: false,
  files: [],
  replay: {},
});

export const fetchMessagesThunk = createAsyncThunk(
  "message/fetchMessagesThunk",
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
  "message/fetchMoreMessageThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetchMessagesApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const findReplayedMessageThunk = createAsyncThunk(
  "message/findReplayedMessageThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await findReplayedMessageApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createMessageThunk = createAsyncThunk(
  "message/createMessageThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createMessageApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "message/deleteMessageThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await deleteMessageApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearMessages(state) {
      messageAdaptor.removeAll(state);
    },
    setMessageDelivered(state, action) {
      const message = action.payload;
      messageAdaptor.setOne(state, message);
    },
    changeMessageStatus(state, action) {
      const { msg_id } = action.payload;
      messageAdaptor.upsertOne(state, {
        _id: msg_id,
        status: "Seen",
      });
    },
    setMessageSeen(state, action) {
      const msg_id = action.payload;
      messageAdaptor.upsertOne(state, {
        _id: msg_id,
        status: "Seen",
      });
    },
    addMessage(state, action) {
      const message = action.payload;
      messageAdaptor.addOne(state, message);
    },
    deleteMessage(state, action) {
      const message_id = action.payload;
      messageAdaptor.upsertOne(state, {
        _id: message_id,
        deleted: true,
      });
    },
    resetMessagePage(state) {
      state.currentPage = 0;
      state.hasNextPage = true;
      state.nextPage = 1;
    },
    addFile(state, action) {
      state.files = [...state.files, action.payload];
    },
    removeFile(state, action) {
      state.files = state.files.filter(
        (item) => item.file.name !== action.payload
      );
    },
    clearFiles(state) {
      state.files = [];
    },
    addReplay(state, action) {
      state.replay = action.payload;
    },
    clearReplay(state) {
      state.replay = {};
    },
  },
  extraReducers: {
    [fetchMessagesThunk.pending]: (state) => {
      state.loading = true;
    },
    [fetchMessagesThunk.fulfilled]: (state, action) => {
      const { data, status, currentPage, nextPage, hasNextPage } =
        action.payload.data;

      if (status === 200) {
        if (state.error === true) state.error = false;
        const msgs = [...data].reverse();

        const items = filterByDate(msgs);

        state.currentPage = currentPage;
        state.nextPage = nextPage;
        state.hasNextPage = hasNextPage;
        messageAdaptor.setAll(state, items);
        state.loading = false;
      }
    },
    [fetchMessagesThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      state.error = true;
      if (error) {
        errorToast({ message });
      }
    },
    [fetchMoreMessageThunk.pending]: (state) => {
      state.fetchMoreLoading = true;
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
        messageAdaptor.setAll(state, sortedItems);
        state.fetchMoreLoading = false;
      }
    },
    [fetchMoreMessageThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.fetchMoreLoading = false;
      state.error = true;
      if (error) {
        errorToast({ message });
      }
    },
    [findReplayedMessageThunk.pending]: (state) => {
      state.fetchMoreLoading = true;
    },
    [findReplayedMessageThunk.fulfilled]: (state, action) => {
      const { data, status, currentPage, nextPage, hasNextPage } =
        action.payload.data;

      if (status === 200) {
        if (state.error === true) state.error = false;
        const msgs = [...data].reverse();

        const sortedItems = filterByDate(msgs);

        state.currentPage = currentPage;
        state.nextPage = nextPage;
        state.hasNextPage = hasNextPage;
        messageAdaptor.setAll(state, sortedItems);
        state.fetchMoreLoading = false;
      }
    },
    [findReplayedMessageThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.fetchMoreLoading = false;
      state.error = true;
      if (error) {
        errorToast({ message });
      }
    },
    [deleteMessageThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      if (error) {
        errorToast({ message });
      }
    },
  },
});

export const {
  clearMessages,
  addMessage,
  setMessageDelivered,
  addUnseenMsg,
  changeMessageStatus,
  setMessageSeen,
  deleteMessage,
  resetMessagePage,
  addFile,
  clearFiles,
  addReplay,
  clearReplay,
  removeFile,
} = messageSlice.actions;

export const { selectAll: getAllMessages } = messageAdaptor.getSelectors(
  (state) => state.message
);

export default messageSlice.reducer;
