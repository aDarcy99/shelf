// Functions
import { createRoot } from "react-dom/client";
// Components
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./features/Home/pages/Home/Home.page";
import { SearchPage } from "./features/Books/pages/Search/Search.page";
// Styles
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
