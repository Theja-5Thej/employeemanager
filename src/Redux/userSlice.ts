import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  isLoggedIn: boolean;
}
const getInitialState = (): UserState => {
  const storedUser = localStorage.getItem("auth_user");
  return storedUser
    ? JSON.parse(storedUser)
    : { email: null, isLoggedIn: false };
};
const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ password: string; email: string }>) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
       localStorage.setItem(
        "auth_user",
        JSON.stringify({
          email: state.email,
          isLoggedIn: true,
        })
      );
    },
    logout: (state) => {
      state.email = null;
      state.isLoggedIn = false;
       localStorage.removeItem("auth_user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; // ✅ THIS LINE FIXES EVERYTHING
