import { useState } from "react";
import contests from "./Data/contests";

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
