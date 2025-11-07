import { useState } from "react";
import contests from "./Data/contests";

export default function Contest() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));
  return (
    <div id="contest">
      {contests.map((contest, i) => (
        <button key={contest.tab} onClick={contentChange} value={i}>
          {contest.tab}
        </button>
      ))}
      <div style={{ marginTop: "1em" }}>{contests[tabIndex].content}</div>
    </div>
  );
}
