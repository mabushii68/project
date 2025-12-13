import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectAdmin = () => {
  /* 관리자 페이지에서 관리할 프로젝트 목록 상태 */
  const [projects, setProjects] = useState([]);

  /* 데이터 로딩 및 에러 상태 관리 */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /* 프로젝트 목록을 서버에서 불러오는 관리자용 데이터 로딩 로직 */
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

        /* 서버 연결 실패 시 관리자 화면 확인을 위한 임시 데이터 사용 */
        setProjects([
          { id: 1, title: "Mock: Unity Level Design" },
          { id: 2, title: "Mock: Texture Mapping" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* 특정 프로젝트 삭제 처리 (관리자 권한 기능) */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`http://localhost:3001/projects/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete project.');
        }

        /* 삭제 성공 시 화면에서도 즉시 목록 갱신 */
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        alert(error.message + "\n(Is the json-server running?)");
      }
    }
  };

  /* 관리자 데이터 로딩 상태 처리 */
  if (loading) return <div>Loading projects...</div>;

  /* 관리자 데이터 조회 실패 시 에러 처리 */
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Project Management</h2>

      {/* 신규 프로젝트 등록 페이지로 이동 */}
      <Link to="/admin/projects/new">
        <button>Add New Project</button>
      </Link>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              margin: '10px 0',
              padding: '10px',
              background: 'var(--surface)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{project.title}</span>

            {/* 프로젝트 수정 및 삭제 버튼 영역 */}
            <div>
              <Link to={`/admin/projects/edit/${project.id}`}>
                <button style={{ marginRight: '10px' }}>Edit</button>
              </Link>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectAdmin;
