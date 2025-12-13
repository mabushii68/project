import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  /* 전역 테마 상태 및 테마 전환 함수 Context에서 사용 */
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    /* 버튼 클릭 시 전체 애플리케이션 테마 전환 */
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}
