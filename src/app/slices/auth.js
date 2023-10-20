import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

import {
  forgotPasswordApi,
  loginUserApi,
  registerUserApi,
} from "../../services";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

export const loginUserThunk = createAsyncThunk(
  "auth/loginUserThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/registerUserThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPasswordThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await forgotPasswordApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.isLoggedIn = true;
        state.token = data.token;
        enqueueSnackbar(data.message, {
          variant: "success",
        });
      }
    },
    [registerUserThunk.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        enqueueSnackbar(data.message, {
          variant: "success",
        });
      }
    },
  },
});

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
