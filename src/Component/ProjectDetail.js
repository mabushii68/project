import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import ProjectSample from "../assets/ProjectSample.png";
import ProjectSample2 from "../assets/ProjectSample2.png";

/* 프로젝트 데이터에 따라 이미지 파일을 동적으로 매칭하기 위한 맵 */
const imageMap = {
  ProjectSample,
  ProjectSample2,
};

export default function ProjectDetail() {
  /* 선택된 프로젝트의 상세 데이터 상태 */
  const [project, setProject] = useState(null);

  /* 데이터 로딩 및 에러 처리 상태 */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* URL 파라미터(id)를 통해 어떤 프로젝트를 조회할지 결정 */
  const { id } = useParams();

  useEffect(() => {
    /* 프로젝트 상세 정보를 서버(JSON Server)에서 비동기로 조회 */
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projects/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]); // URL의 프로젝트 id가 변경될 때마다 재조회

  /* 로딩 중 상태 처리 */
  if (loading) {
    return <div>Loading...</div>;
  }

  /* 에러 발생 시 예외 처리 */
  if (error) {
    return <div>Error loading project: {error}.</div>;
  }

  /* 프로젝트 데이터가 없는 경우 처리 */
  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <AnimatedSection animationClass="fade-in">
      <div className="project-content-card">
        <h2>{project.title}</h2>

        {/* 서버에서 받은 이미지 이름을 기준으로 실제 이미지 렌더링 */}
        {project.image && (
          <img src={imageMap[project.image]} alt={project.title} />
        )}

        <fieldset>
          <legend>프로젝트 설명</legend>
          <ul>
            {/* 프로젝트 설명 배열을 리스트 형태로 출력 */}
            {project.description &&
              project.description.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>
        </fieldset>
      </div>
    </AnimatedSection>
  );
}
