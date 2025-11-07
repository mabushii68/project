import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Index from "./Component/Index";
import Introduction from "./Component/Introduction";
import Project from "./Component/Project";
import Contest from "./Component/Contest";
import Career from "./Component/Career";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        김정준의 portfolio <br />
        테크니컬 아티스트 
      </header>

      <div className="container">
        <nav>
          <Link to="/introduction">나의 소개</Link>
          <Link to="/project">프로젝트</Link>
          <Link to="/contest">공모전</Link>
          <Link to="/career">나의 경력</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/project" element={<Project />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/career" element={<Career />} />
          </Routes>
        </main>
      </div>

      <footer>
        <i>
          Copyright 2023. 지은이 all rights reserved.
          <br />
          연락처 : 010-2080-7147
        </i>
      </footer>
    </BrowserRouter>
  );
}
