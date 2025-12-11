import { BrowserRouter, Route, Routes, NavLink, useNavigate, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

import Introduction from "./Component/Introduction";
import Project from "./Component/Project";
import Contest from "./Component/Contest";
import Career from "./Component/Career";
import Login from "./Component/Login";
import ThemeToggle from "./Component/ThemeToggle";
import "./App.css";

function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <>
      <header className="top-header">
        <div className="logo">
          김정준의 Portfolio
          <span className="subtitle">Technical Artist</span>
        </div>

        <nav className="top-nav">
          <ThemeToggle />
          {isLoggedIn && (
            <>
              <NavLink to="/introduction">소개</NavLink>
              <NavLink to="/project">프로젝트</NavLink>
              <NavLink to="/contest">공모전</NavLink>
              <NavLink to="/career">경력</NavLink>
            </>
          )}
          {isLoggedIn ? (
            <button className="login-btn" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <button className="login-btn" onClick={() => navigate('/login')}>
              로그인
            </button>
          )}
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/introduction" element={<Introduction />} />
              <Route path="/project" element={<Project />} />
              <Route path="/contest" element={<Contest />} />
              <Route path="/career" element={<Career />} />
              {/* Redirect root to introduction when logged in */}
              <Route path="/" element={<Navigate to="/introduction" />} />
              {/* Redirect any other path to introduction */}
              <Route path="*" element={<Navigate to="/introduction" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              {/* Redirect any other path to /login when logged out */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </main>

      <footer className="footer">
        <i>
          Copyright 2025. 지은이 all rights reserved.
          <br />
          연락처 : 010-2080-7147
        </i>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
