import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

import Introduction from "./Component/Introduction";
import Project from "./Component/Project";
import Contest from "./Component/Contest";
import Career from "./Component/Career";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="top-header">
        <div className="logo">
          김정준의 Portfolio
          <span className="subtitle">Technical Artist</span>
        </div>

        <nav className="top-nav">
          <NavLink to="/introduction">소개</NavLink>
          <NavLink to="/project">프로젝트</NavLink>
          <NavLink to="/contest">공모전</NavLink>
          <NavLink to="/career">경력</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/career" element={<Career />} />
        </Routes>
      </main>

      <footer className="footer">
        <i>
          Copyright 2023. 지은이 all rights reserved.
          <br />
          연락처 : 010-2080-7147
        </i>
      </footer>
    </BrowserRouter>
  );
}
