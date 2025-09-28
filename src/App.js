import { useState } from "react";
import Datas from "./Datas";

function App() {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Datas.map((d, idx) => (
          <button
            key={d.tab}
            onClick={() => setCurrent(idx)}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              background: current === idx ? "#e0ecff" : "#fff",
              cursor: "pointer"
            }}
          >
            {d.tab} {idx}
          </button>
        ))}
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
        {Datas[current].content}
      </div>
    </div>
  );
}

export default App;
