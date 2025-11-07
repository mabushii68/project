import { useState } from "react";
import intros from "./Data/intros";

export default function Introduction() {
  const [tabIndex, setTabIndex] = useState(0);
  const contentChange = (e) => setTabIndex(Number(e.currentTarget.value));

  return (
    <div>
      {intros.map((intro, i) => (
        <button key={intro.tab} onClick={contentChange} value={i}>
          {intro.tab}
        </button>
      ))}
      
      <div style={{ marginTop: "1em" }}>{intros[tabIndex].content}</div>
    </div>
  );
}
