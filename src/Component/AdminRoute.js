import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  /* Redux 전역 상태에서 로그인 여부 및 관리자 권한 여부 조회 */
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  /* 접근 시도 이전의 현재 경로 정보 저장 (로그인 후 복귀용) */
  const location = useLocation();

  /* 로그인하지 않은 사용자는 로그인 페이지로 이동 */
  if (!isLoggedIn) {
  return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /* 로그인은 했지만 관리자 권한이 없는 경우 메인 페이지로 이동 */
  if (!isAdmin) {
  return <Navigate to="/" replace />;
  }

  /* 관리자 권한이 있는 경우에만 자식 컴포넌트 렌더링 */
  return children;
};

export default AdminRoute;
