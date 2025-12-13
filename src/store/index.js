import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

/* Redux 전역 상태 관리를 위한 스토어 생성 */
const store = configureStore({
  reducer: {
    /* 인증 관련 상태(authSlice) 전역 등록 */
    auth: authReducer,
  },
});

export default store;
