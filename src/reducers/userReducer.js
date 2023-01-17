import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    clearUser(state) {
      return {};
    },
  },
});

export const { setProfile, setAuth, clearUser } = userSlice.actions;

export default userSlice.reducer;
