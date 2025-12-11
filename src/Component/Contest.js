import { useState } from "react";

// Sub-components
function Contest1() {
  return (
    <div>
      <h1>인디 게임 개발 공모전</h1>
        <fieldset>
        <legend>공모전 개요</legend>
        <ul>
          <li>내년 상반기 인디 게임 개발 공모전에 나갈 예정</li>
        </ul>
      </fieldset>
    </div>
  );
}

function Contest2() {
  return (
    <div>
      <h1>청년지원 프로젝트 사업</h1>
      <fieldset>
        <legend>공모전 개요</legend>
        <ul>
          <li>공모전에 대한 내용을 작성</li>
        </ul>
      </fieldset>
    </div>
  );
}

function Contest3() {
  return (
    <div>
      <h1>캡스톤 디자인</h1>
      <fieldset>
        <legend>공모전 개요</legend>
        <ul>
          <li>2027-1학기 전공프로젝트 예정</li>
        </ul>
      </fieldset>
    </div>
  );
}

// Data
const contests = [
  { tab: "인디 게임 공모전", content: <Contest1 /> },
  { tab: "청년지원 사업", content: <Contest2 /> },
  { tab: "캡스톤 디자인", content: <Contest3 /> },
];

// Main Component
export default function Contest() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));

  return (
    <div id="contest">
      <div className="project-tabs">
        {contests.map((c, i) => (
          <button
            key={c.tab}
            value={i}
            onClick={contentChange}
            className={`project-tab ${tabIndex === i ? "active" : ""}`}
          >
            {c.tab}
          </button>
        ))}
      </div>

      <div className="project-content-card">
        {contests[tabIndex].content}
      </div>
    </div>
  );
}