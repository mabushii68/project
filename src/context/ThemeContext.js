import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 기본값은 light

  const toggleTheme = () => {
    console.log('Toggling theme...');
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`Theme changed from ${prevTheme} to ${newTheme}`);
      return newTheme;
    });
  };

  // 테마가 변경될 때마다 html 태그에 클래스를 적용/제거합니다.
  useEffect(() => {
    const root = document.documentElement; // body 대신 html 태그를 선택
    console.log(`Applying theme class to <html>: ${theme}`);
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
