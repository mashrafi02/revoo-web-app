import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  currentSearch:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setCurrentSearch: (state, action) => {
      state.currentSearch = action.payload;
    }
  },
});

export const { setUser, clearUser, setCurrentSearch } = authSlice.actions;
export default authSlice.reducer;
