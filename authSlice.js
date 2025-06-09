import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }) => {
    // MOCK LOGIN → this will always succeed for testing/screenshots

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fake user data → same format as DummyJSON
    return {
      id: 1,
      username,
      token: 'mock-token-12345',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
    };
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;