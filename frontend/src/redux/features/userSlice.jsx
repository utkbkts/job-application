import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  company: JSON.parse(localStorage.getItem("companyName")) || [],
};
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setisCompany(state, action) {
      state.company = action.payload;
      localStorage.setItem("companyName", JSON.stringify(state.company));
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setisCompany } = userSlice.actions;
