import { useState } from "react";
import careers from "./Data/careers";

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
