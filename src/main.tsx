// Functions
import { createRoot } from "react-dom/client";
// Components
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home/Home.page";
// Styles
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
