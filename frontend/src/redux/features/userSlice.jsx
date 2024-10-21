import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};
export const userSlice = createSlice({
  name: "authApi",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated } = userSlice.actions;
