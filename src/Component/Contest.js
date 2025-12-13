import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

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
/* 공모전 유형별 탭과 렌더링할 컴포넌트 매핑 */
const contests = [
  { tab: "인디 게임 공모전", content: <Contest1 /> },
  { tab: "캡스톤 디자인", content: <Contest2 /> },
];

// Main Component
export default function Contest() {
  /* 현재 선택된 공모전 탭 인덱스 상태 관리 */
  const [tabIndex, setTabIndex] = useState(0);

  /* 탭 버튼 클릭 시 선택된 인덱스로 콘텐츠 전환 */
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));

  return (
    /* 스크롤 진입 시 공모전 섹션 애니메이션 효과 적용 */
    <AnimatedSection animationClass="fade-in">
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

        {/* 선택된 탭에 해당하는 공모전 콘텐츠 렌더링 */}
        <div className="project-content-card">
          {contests[tabIndex].content}
        </div>
      </div>
    </AnimatedSection>
  );
}
