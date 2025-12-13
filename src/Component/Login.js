import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import './Login.css';

export default function Login() {
  /* 입력된 아이디와 비밀번호를 로컬 상태로 관리 */
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  /* Redux 액션 실행을 위한 dispatch 함수 */
  const dispatch = useDispatch();

  /* 로그인 요청 상태 및 에러 메시지 전역 상태 조회 */
  const { isLoading, error } = useSelector((state) => state.auth);

  /* 로그인 폼 제출 시 Redux 로그인 액션 실행 */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ id, password }));
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>

        <input 
          type="text" 
          placeholder="아이디 (user)" 
          value={id}
          onChange={(e) => setId(e.target.value)}
          required 
        />

        <input 
          type="password" 
          placeholder="비밀번호 (1234)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        {/* 로그인 처리 중에는 중복 제출 방지 */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        {/* 로그인 실패 시 에러 메시지 출력 */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
