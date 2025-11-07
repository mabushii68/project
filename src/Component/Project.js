import { useState } from "react";
import projects from "./Data/projects";

export default function Project() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));
  return (
    <div id="project">
      {projects.map((project, i) => (
        <button key={project.tab} onClick={contentChange} value={i}>
          {project.tab}
        </button>
      ))}
      <div style={{ marginTop: "1em" }}>{projects[tabIndex].content}</div>
    </div>
  );
}
