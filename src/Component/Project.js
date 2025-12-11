import React, { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";

// This component will render the content of a single project
const ProjectContent = ({ project }) => {
  if (!project) return null;

  return (
    <div>
      <h2>{project.title}</h2>
      {project.image && <img src={project.image} alt={project.title} />}
      <fieldset>
        <legend>프로젝트 설명</legend>
        <ul>
          {project.description && project.description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
};

// Main component
export default function Project() {
  const [projects, setProjects] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
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
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const contentChange = (e) => {
    setTabIndex(Number(e.currentTarget.value));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading projects: {error}. (Is the json-server running?)</div>;
  }
  
  if (projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <AnimatedSection animationClass="fade-in">
      <div id="project">
        <div className="project-tabs">
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={contentChange}
              value={i}
              className={`project-tab ${tabIndex === i ? "active" : ""}`}
            >
              {project.tabName}
            </button>
          ))}
        </div>

        <div className="project-content-card">
          <ProjectContent project={projects[tabIndex]} />
        </div>
      </div>
    </AnimatedSection>
  );
}
