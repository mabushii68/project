import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        // In case the server isn't running, use mock data
        console.warn("API fetch failed, falling back to mock data. Please start the json-server.", error);
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`http://localhost:3001/projects/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete project.');
        }
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        alert(error.message + "\n(Is the json-server running?)");
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Project Management</h2>
      <Link to="/admin/projects/new">
        <button>Add New Project</button>
      </Link>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((project) => (
          <li key={project.id} style={{ margin: '10px 0', padding: '10px', background: 'var(--surface)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{project.title}</span>
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
