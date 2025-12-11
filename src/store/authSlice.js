import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Thunk for asynchronous login logic
export const login = createAsyncThunk(
  'auth/login',
  async ({ id, password }, { rejectWithValue }) => {
    // Simulate an API call
    try {
      // Mock authentication for admin
      if (id === 'admin' && password === 'admin') {
        const user = { id, name: 'Admin' };
        return { user, isAdmin: true };
      }
      // Mock authentication for regular user
      if (id === 'user' && password === '1234') {
        const user = { id, name: 'Test User' };
        return { user, isAdmin: false };
      } else {
        throw new Error('아이디 혹은 비밀번호가 잘못 입력되었습니다.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  isAdmin: false, // Added isAdmin flag
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false; // Reset isAdmin on logout
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin; // Set isAdmin from payload
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isAdmin = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
//