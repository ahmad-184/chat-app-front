import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

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
  loading: true,
  users: [],
  friends: [],
  friend_requests: [],
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
    toggleSidebar(state) {
      state.right_sidebar.open = !state.right_sidebar.open;
    },
    updateSidebarType(state, action) {
      state.right_sidebar.type = action.payload.type;
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
    [updateUsersThunk.rejected]: (_, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        enqueueSnackbar(message, { variant: "error" });
      }
    },
    [updateFriendsThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateFriendsThunk.fulfilled]: (state, action) => {
      const { data, status } = action.payload.data;
      state.loading = false;
      console.log(action.payload);
      if (status === 200) {
        state.friends = [...data];
      }
    },
    [updateFriendsThunk.rejected]: (_, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        enqueueSnackbar(message, { variant: "error" });
      }
    },
    [updateFriendRequestsThunk.pending]: (state) => {
      state.loading = true;
    },
    [updateFriendRequestsThunk.fulfilled]: (state, action) => {
      const { data, status } = action.payload.data;
      state.loading = false;
      if (status === 200) {
        state.friend_requests = [...data];
      }
    },
    [updateFriendRequestsThunk.rejected]: (_, action) => {
      const { error, message } = action.payload;
      state.loading = false;
      if (error) {
        enqueueSnackbar(message, { variant: "error" });
      }
    },
  },
});

export const { toggleSidebar, updateSidebarType } = appSlice.actions;

export const getRightSidebar = (state) => state.app.right_sidebar;
export const getUsers = (state) => state.app.users;
export const getFriends = (state) => state.app.friends;
export const getFriendRequests = (state) => state.app.friend_requests;

export default appSlice.reducer;
