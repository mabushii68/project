import React, { createContext, useState, useEffect } from 'react';

/* 전역 테마 상태를 공유하기 위한 Context 생성 */
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  /* 현재 테마 상태 관리 (기본값: light) */
  const [theme, setTheme] = useState('light');

  /* 테마 전환 함수 (light ↔ dark) */
  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === 'light' ? 'dark' : 'light'
    );
  };

  /* 테마 변경 시 html 태그에 클래스 적용하여 전역 스타일 반영 */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    /* 하위 컴포넌트에서 테마 상태와 전환 함수 사용 가능 */
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
