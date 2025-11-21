import { useState } from "react";
import projects from "./Data/projects";

export default function Project() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));

  return (
    <div id="project">
      <div className="project-tabs">
        {projects.map((project, i) => (
          <button
            key={project.tab}
            onClick={contentChange}
            value={i}
            className={`project-tab ${tabIndex === i ? "active" : ""}`}
          >
            {project.tab}
          </button>
        ))}
      </div>

      <div className="project-content-card">
        {projects[tabIndex].content}
      </div>
    </div>
  );
}
