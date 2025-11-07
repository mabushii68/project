import { useState } from "react";
import careers from "./Data/careers";

export default function Career() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));
  return (
    <div id="career">
      {careers.map((c, i) => (
        <button key={c.tab} onClick={contentChange} value={i}>
          {c.tab}
        </button>
      ))}
      <div style={{ marginTop: "1em" }}>{careers[tabIndex].content}</div>
    </div>
  );
}
