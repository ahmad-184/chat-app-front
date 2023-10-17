import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginUserApi } from "../../services";

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.isLoggedIn = true;
        state.token = data.token;
      }
    },
  },
});

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
