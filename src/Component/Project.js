import { useState } from "react";

// Sub-components that were previously in separate files
function Project1() {
  return (
    <div>
      <h3>React를 이용한 Frontend Web</h3>
      <img src="/image/react.png" alt="react" />
      <fieldset>
        <legend>프로젝트 개요</legend>
        <ul>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
        </ul>
      </fieldset>
    </div>
  );
}

function Project2() {
  return (
    <div>
      <h3>VueJs 이용한 Frontend Web</h3>
      <img src="/image/vue.png" alt="vue" />
      <fieldset>
        <legend>프로젝트 개요</legend>
        <ul>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
        </ul>
      </fieldset>
    </div>
  );
}

function Project3() {
  return (
    <div>
      <h3>NodeJs 이용한 Backend Web</h3>
      <img src="/image/node.png" alt="node" />
      <fieldset>
        <legend>프로젝트 개요</legend>
        <ul>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
        </ul>
      </fieldset>
    </div>
  );
}

function Project4() {
  return (
    <div>
      <h3>Proxy 서버를 이용한 Web</h3>
      <img src="/image/proxy.png" alt="proxy" />
      <fieldset>
        <legend>프로젝트 개요</legend>
        <ul>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
          <li>프로젝트에 대한 내용을 작성</li>
        </ul>
      </fieldset>
    </div>
  );
}

// Data that was previously in a separate file
const projects = [
  { tab: "React Project", content: <Project1 /> },
  { tab: "VueJs Project", content: <Project2 /> },
  { tab: "NodeJs Project", content: <Project3 /> },
  { tab: "Proxy Project", content: <Project4 /> },
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