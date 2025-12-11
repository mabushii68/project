import { useState } from "react";
import projectSample from "../assets/ProjectSample.png";
import projectSample2 from "../assets/ProjectSample2.png";

function Project1() {
  return (
    <div>
      <h2>Unity Level Design</h2>
      <img src={projectSample} alt="react" />
      <fieldset>
        <legend>프로젝트 설명</legend>
        <ul>
          <li>개발 툴 : Unity, Blender, Substance 3D Painter</li>
          <li>VR 환경에서 완벽히 상호작용되는 맵 개발</li>
        </ul>
      </fieldset>
    </div>
  );
}


function Project2() {
  return (
    <div>
      <h2>Texture Mapping Project</h2>
      <img src={projectSample2} alt="react" />
      <fieldset>
        <legend>프로젝트 설명</legend>
        <ul>
          <li>Normal Map, Roughness 공부</li>
          <li>광산 맵 환경 구현</li>
        </ul>
      </fieldset>
    </div>
  );
}


// Data that was previously in a separate file
const projects = [
  { tab: "Level Design Project", content: <Project1 /> },
  { tab: "Texture Mapping Project", content: <Project2 /> },
];

// Main component
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