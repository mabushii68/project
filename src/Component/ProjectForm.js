import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    tabName: '',
    title: '',
    image: '',
    description: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL if it exists
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const response = await fetch(`http://localhost:3001/projects/${id}`);
          if (!response.ok) throw new Error('Project not found');
          const data = await response.json();
          // The description is an array, so we join it for the textarea
          setFormData({ ...data, description: data.description.join('\n') });
        } catch (error) {
          console.error("Failed to fetch project:", error);
          alert("Could not load project data. Is json-server running?");
        }
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert the textarea string back into an array of strings
    const payload = {
      ...formData,
      description: formData.description.split('\n').filter(line => line.trim() !== ''),
    };

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
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} project.`);
      }

      navigate('/admin/projects'); // Redirect to the admin list after submission
    } catch (error) {
      alert(error.message + "\n(Is the json-server running?)");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--surface)', padding: '20px', borderRadius: '8px' }}>
      <h2>{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>Tab Name</label>
        <input type="text" name="tabName" value={formData.tabName} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Image Path</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="/assets/image-name.png" required style={{ width: '100%', padding: '8px' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Description (one item per line)</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '8px', minHeight: '100px' }} />
      </div>
      <button type="submit">{isEditMode ? 'Update Project' : 'Add Project'}</button>
    </form>
  );
};

export default ProjectForm;
