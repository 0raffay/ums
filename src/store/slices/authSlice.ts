import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const userData = localStorage.getItem("userData");

const initialState: any = {
  isLoggedIn: !!token,  
  token: token,
  userData: userData !== null ? JSON.parse(userData) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, userData } = action.payload;
      state.token = token;
      state.userData = userData;
      state.isLoggedIn = true;

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      state.isLoggedIn = false;

      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
