import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  token: string | null;
  // isAdmin: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Store the token and isAdmin in localStorage
      localStorage.setItem("token-admin", action.payload.token || "");
      // localStorage.setItem("isAdmin", action.payload.isAdmin.toString());
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear token and isAdmin from localStorage on logout
      localStorage.removeItem("token-admin");
      // localStorage.removeItem("isAdmin");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
