import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Article from "./components/Article";
import Datas from "./components/Datas";

function App() {
  const [mode, setMode] = useState("WELCOME");
  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    content = <Article title="Welcome" body="Hello, READ"></Article>;
  }

  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => setMode("WELCOME")}
      />
      <Nav
        datas={Datas}
        onChangeMode={() => setMode("READ")}
      />
      {content}
    </div>
  );
}

export default App;
