import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { errorToast } from "../../components/ToastProvider";

import {
  getAllFriendsApi,
  getAllUsersApi,
  getFriendRequestsApi,
} from "../../services";

const initialState = {
  right_sidebar: {
    open: false,
    type: "CONTACT", // "CONTACT" , "SHARED" , "STARRED"
  },
  loading: false,
  users: [],
  friends: [],
  friend_requests: {
    received: [],
    sent: [],
  },
  chat_type: "idle",
  room_id: "",
};

export const updateUsersThunk = createAsyncThunk(
  "app/updateUsersThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await getAllUsersApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateFriendsThunk = createAsyncThunk(
  "app/updateFriendsThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await getAllFriendsApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateFriendRequestsThunk = createAsyncThunk(
  "app/updateFriendRequestsThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await getFriendRequestsApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    logOut(state) {
      state.users = [];
      state.friends = [];
      state.loading = false;
      state.chat_type = "idle";
      state.room_id = "";
      state.friend_requests.received = [];
      state.friend_requests.sent = [];
    },
    toggleSidebar(state) {
      state.right_sidebar.open = !state.right_sidebar.open;
    },
    updateSidebarType(state, action) {
      state.right_sidebar.type = action.payload.type;
    },
    selectConversation(state, action) {
      state.chat_type = action.payload.chat_type;
      state.room_id = action.payload.room_id;
    },
    addFriend(state, { payload }) {
      state.friends.push(payload);
    },
    updateRequest(state, { payload }) {
      const { request, request_id, status } = payload;
      if (request === "sent") {
        const updatedRequestIndex = state.friend_requests.sent.findIndex(
          ({ _id }) => _id === request_id
        );
        state.friend_requests.sent[updatedRequestIndex] = {
          ...state.friend_requests.sent[updatedRequestIndex],
          status,
        };
      }
    },
    removeUser(state, { payload }) {
      state.users = state.users.filter(({ _id }) => _id !== payload);
    },
    removeReceivedRequest(state, { payload }) {
      state.friend_requests.received = state.friend_requests.received.filter(
        ({ _id }) => _id !== payload
      );
    },
    removeSentRequest(state, { payload }) {
      state.friend_requests.sent = state.friend_requests.sent.filter(
        ({ _id }) => _id !== payload
      );
    },
    updateFriendsStatus(state, action) {
      const { friend_id, friend_status } = action.payload;
      const conversationIndex = state.friends.findIndex(
        (item) => item._id === friend_id
      );
      state.friends[conversationIndex] = {
        ...state.friends[conversationIndex],
        status: friend_status,
      };
    },
  },
  extraReducers: {
    [updateUsersThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateUsersThunk.fulfilled]: (state, action) => {
      const { data, status } = action.payload.data;
      state.loading = false;
      if (status === 200) {
        state.users = [...data];
      }
    },
    [updateUsersThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        errorToast({ message });
      }
    },
    [updateFriendsThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateFriendsThunk.fulfilled]: (state, action) => {
      const { data, status } = action.payload.data;
      state.loading = false;
      if (status === 200) {
        state.friends = [...data];
      }
    },
    [updateFriendsThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        errorToast({ message });
      }
    },
    [updateFriendRequestsThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateFriendRequestsThunk.fulfilled]: (state, action) => {
      const { data, status } = action.payload.data;
      state.loading = false;
      if (status === 200) {
        state.friend_requests = { ...data };
      }
    },
    [updateFriendRequestsThunk.rejected]: (state, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        errorToast({ message });
      }
    },
  },
});

export const {
  toggleSidebar,
  updateSidebarType,
  selectConversation,
  logOut: appLogout,
  addFriend,
  removeReceivedRequest,
  removeSentRequest,
  updateRequest,
  removeUser,
  addRecievedFriendRequest,
  addSentFriendRequest,
  updateFriendRequests,
  updateFriendsStatus,
} = appSlice.actions;

export const getRightSidebar = (state) => state.app.right_sidebar;
export const getUsers = (state) => state.app.users;
export const getFriends = (state) => state.app.friends;
export const getFriendRequests = (state) => state.app.friend_requests;
export const getAppLoading = (state) => state.app.loading;

export default appSlice.reducer;
