import { useState } from "react";

// Sub-components
function Career1() {
  return (
    <div>
      <h1>아르바이트 및 인턴</h1>
      <fieldset>
        <legend>아르바이트</legend>
        <ul>
          <li>군생활 당시 행정병으로써 엑셀을 이용한 데이터 관리 경험</li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>인턴</legend>
        <ul>
          <li>펄어비스 인턴십을 신청할 예정</li>
        </ul>
      </fieldset>
    </div>
  );
}

const Career2 = () => {
  return (
    <div>
      <h1>사회 봉사 및 연수 </h1>
      <fieldset>
        <legend>사회 봉사</legend>
        <ul>
          <li>가천대학교 2022-1학기 사회 봉사 경험</li>
          <li>연탄 나르기 등 경험</li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>해외 연수</legend>
        <ul>
          <li>필리핀 어학 연수 6개월</li>
        </ul>
      </fieldset>
    </div>
  );
};

const Career3 = () => {
  return (
    <div>
      <h1>자격증 및 그외 스펙</h1>
      <fieldset>
        <legend>자격증</legend>
        <ul>
          <li>운전면허 2종 보통</li>
        </ul>
      </fieldset>

      <fieldset>
        <legend>그외 스펙</legend>
        <ul>
          <li>앞으로 많이 만들겠습니다.</li>
        </ul>
      </fieldset>
    </div>
  );
};

// Data
const careers = [
  { tab: "아르바이트/인턴", content: <Career1 /> },
  { tab: "사회봉사/연수", content: <Career2 /> },
  { tab: "자격증 외", content: <Career3 /> },
];

// Main Component
export default function Career() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));

  return (
    <div id="career">
      <div className="project-tabs">
        {careers.map((c, i) => (
          <button
            key={c.tab}
            onClick={contentChange}
            value={i}
            className={`project-tab ${tabIndex === i ? "active" : ""}`}
          >
            {c.tab}
          </button>
        ))}
      </div>

      <div className="project-content-card">
        {careers[tabIndex].content}
      </div>
    </div>
  );
}