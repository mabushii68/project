import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

import Introduction from "./Component/Introduction";
import Project from "./Component/Project";
import Contest from "./Component/Contest";
import Career from "./Component/Career";
import Login from "./Component/Login";
import ThemeToggle from "./Component/ThemeToggle";
import AdminRoute from "./Component/AdminRoute";
import ProjectAdmin from "./Component/ProjectAdmin";
import ProjectForm from "./Component/ProjectForm";
import ProjectDetail from "./Component/ProjectDetail";
import Snowfall from "./Component/Snowfall";

function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  /* Redux 전역 인증 상태 조회 */
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  /* 로그아웃 처리 및 로그인 페이지로 이동 */
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  /* 눈 효과(Snowfall)를 표시할 경로 목록 */
  const snowPaths = ['/introduction', '/project', '/contest', '/career'];

  /* 로그인 상태 및 현재 경로에 따라 배경 효과 표시 여부 결정 */
  const showSnow =
    !isLoggedIn || snowPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* 조건에 따라 배경 눈 효과 렌더링 */}
      {showSnow && <Snowfall />}

      <header className="top-header">
        <div className="logo">
          React Portfolio Project
          <span className="subtitle">고급웹프로그래밍</span>
        </div>

        <nav className="top-nav">
          {/* 전역 테마 전환 버튼 */}
          <ThemeToggle />

          {/* 로그인된 사용자에게만 네비게이션 메뉴 표시 */}
          {isLoggedIn && (
            <>
              <NavLink to="/introduction">소개</NavLink>
              <NavLink to="/project">프로젝트</NavLink>
              <NavLink to="/contest">공모전</NavLink>
              <NavLink to="/career">경력</NavLink>

              {/* 관리자 권한이 있는 경우에만 관리 메뉴 노출 */}
              {isAdmin && <NavLink to="/admin/projects">관리</NavLink>}
            </>
          )}

          {/* 로그인 / 로그아웃 버튼 분기 처리 */}
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
          {/* 로그인 상태에 따라 접근 가능한 라우트 분리 */}
          {isLoggedIn ? (
            <>
              <Route path="/introduction" element={<Introduction />} />

              {/* 프로젝트 목록 + 상세 중첩 라우트 구조 */}
              <Route path="/project" element={<Project />}>
                <Route path=":id" element={<ProjectDetail />} />
              </Route>

              <Route path="/contest" element={<Contest />} />
              <Route path="/career" element={<Career />} />

              {/* 관리자 전용 라우트 (AdminRoute로 보호) */}
              <Route
                path="/admin/projects"
                element={<AdminRoute><ProjectAdmin /></AdminRoute>}
              />
              <Route
                path="/admin/projects/new"
                element={<AdminRoute><ProjectForm /></AdminRoute>}
              />
              <Route
                path="/admin/projects/edit/:id"
                element={<AdminRoute><ProjectForm /></AdminRoute>}
              />

              {/* 로그인 상태에서 기본 진입 경로 설정 */}
              <Route path="/" element={<Navigate to="/introduction" />} />
              <Route path="*" element={<Navigate to="/introduction" />} />
            </>
          ) : (
            <>
              {/* 비로그인 상태에서는 로그인 페이지만 접근 가능 */}
              <Route path="/login" element={<Login />} />
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
    /* 전역 테마 Context + 라우터 최상위 래핑 */
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
