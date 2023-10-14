import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  right_sidebar: {
    open: false,
    type: "CONTACT", // "CONTACT" , "SHARED" , "STARRED"
  },
};

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
});

export const { toggleSidebar, updateSidebarType } = appSlice.actions;

export const getRightSidebar = (state) => state.app.right_sidebar;

export default appSlice.reducer;
