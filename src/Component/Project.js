import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

// Main component
export default function Project() {
  /* 서버에서 불러온 프로젝트 목록 상태 관리 */
  const [projects, setProjects] = useState([]);

  /* 데이터 로딩 및 에러 상태 관리 */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* URL 파라미터로 선택된 프로젝트 id 조회 */
  const { id } = useParams();

  /* 특정 조건에서 URL을 강제로 변경하기 위한 네비게이션 함수 */
  const navigate = useNavigate();

  useEffect(() => {
    /* json-server로부터 프로젝트 목록 비동기 로딩 */
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    /* URL에 프로젝트 id가 없을 경우 첫 번째 프로젝트로 자동 이동 */
    if (!id && projects.length > 0) {
      navigate(`/project/${projects[0].id}`);
    }
  }, [id, projects, navigate]);

  /* 프로젝트 데이터 로딩 중 표시 */
  if (loading) {
    return <div>Loading...</div>;
  }

  /* 데이터 로딩 실패 시 에러 처리 */
  if (error) {
    return <div>Error loading projects: {error}. (Is the json-server running?)</div>;
  }

  /* 프로젝트 데이터가 없는 경우 */
  if (projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    /* 프로젝트 섹션 스크롤 진입 시 애니메이션 적용 */
    <AnimatedSection animationClass="fade-in">
      <div id="project">
        <div className="project-tabs">
          {projects.map((project) => (
            <NavLink
              key={project.id}
              to={`/project/${project.id}`}
              className={({ isActive }) =>
                `project-tab ${isActive ? "active" : ""}`
              }
            >
              {project.tabName}
            </NavLink>
          ))}
        </div>

        {/* 선택된 프로젝트에 해당하는 상세 컴포넌트 렌더링 */}
        <div className="project-content-card">
          <Outlet />
        </div>
      </div>
    </AnimatedSection>
  );
}
