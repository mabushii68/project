import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import './Login.css';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

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
        <button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
