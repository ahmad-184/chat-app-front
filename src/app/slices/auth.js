import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

import {
  forgotPasswordApi,
  loginUserApi,
  registerUserApi,
  resetPasswordApi,
  verifyUserApi,
} from "../../services";

const initialState = {
  isLoggedIn: false,
  token: "",
  userId: "",
  isLoading: false,
  email: "",
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

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPasswordThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyUserThunk = createAsyncThunk(
  "auth/verifyUserThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await verifyUserApi(data);
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
    logOut(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.userId = "";
    },
    updateRegisterEmail(state, action) {
      if (action.payload) {
        state.email = action.payload.email;
      }
    },
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.isLoggedIn = true;
        state.token = data.token;
        state.userId = data.userId;
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
    [verifyUserThunk.fulfilled]: (state, action) => {
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
export const getRegisterEmail = (state) => state.auth.email;
export const getToken = (state) => state.auth.token;
export const getUserId = (state) => state.auth.userId;

export const { logOut, updateRegisterEmail } = authSlice.actions;
export default authSlice.reducer;
