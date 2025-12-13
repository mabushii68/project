import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = () => {
  /* 프로젝트 생성/수정 폼 입력 데이터 상태 */
  const [formData, setFormData] = useState({
    tabName: '',
    title: '',
    image: '',
    description: '',
  });

  /* 폼 제출 후 관리자 목록 페이지로 이동하기 위한 네비게이션 */
  const navigate = useNavigate();

  /* URL 파라미터 id 존재 여부로 수정/생성 모드 판단 */
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    /* 수정 모드일 경우 기존 프로젝트 데이터를 불러와 폼에 반영 */
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`http://localhost:3001/projects/${id}`);
          if (!response.ok) throw new Error('Project not found');
          const data = await response.json();

          /* 설명(description)을 textarea 입력용 문자열로 변환 */
          setFormData({ ...data, description: data.description.join('\n') });
        } catch (error) {
          alert("프로젝트 데이터를 불러올 수 없습니다. json-server 실행 여부를 확인하세요.");
        }
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  /* 폼 입력 값 변경 시 상태 업데이트 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* 프로젝트 생성 또는 수정 요청 처리 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* textarea 입력을 서버 저장 형식(문자열 배열)으로 변환 */
    const payload = {
      ...formData,
      description: formData.description
        .split('\n')
        .filter(line => line.trim() !== ''),
    };

    /* 수정/생성 모드에 따라 API 경로와 HTTP 메소드 결정 */
    const url = isEditMode
      ? `http://localhost:3001/projects/${id}`
      : 'http://localhost:3001/projects';
    
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(isEditMode ? '프로젝트 수정 실패' : '프로젝트 생성 실패');
      }

      /* 처리 완료 후 관리자 프로젝트 목록으로 이동 */
      navigate('/admin/projects');
    } catch (error) {
      alert(error.message + "\n(json-server 실행 여부를 확인하세요)");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'var(--surface)',
        padding: '20px',
        borderRadius: '8px'
      }}
    >
      <h2>{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Tab Name</label>
        <input
          type="text"
          name="tabName"
          value={formData.tabName}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Image Path</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Description (one item per line)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">
        {isEditMode ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
