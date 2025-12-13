import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* 비동기 로그인 처리 thunk (아이디/비밀번호 기반 인증 시뮬레이션) */
export const login = createAsyncThunk(
  'auth/login',
  async ({ id, password }, { rejectWithValue }) => {
    try {
      /* 관리자 계정 인증 */
      if (id === 'admin' && password === 'admin') {
        const user = { id, name: 'Admin' };
        return { user, isAdmin: true };
      }

      /* 일반 사용자 계정 인증 */
      if (id === 'user' && password === '1234') {
        const user = { id, name: 'Test User' };
        return { user, isAdmin: false };
      }

      /* 인증 실패 처리 */
      throw new Error('아이디 혹은 비밀번호가 잘못 입력되었습니다.');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* 인증 관련 전역 상태 초기값 정의 */
const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    /* 로그아웃 시 인증 및 사용자 정보 초기화 */
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* 로그인 요청 시작 상태 */
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      /* 로그인 성공 시 사용자 정보 및 권한 저장 */
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
        state.error = null;
      })

      /* 로그인 실패 시 에러 상태 처리 */
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
