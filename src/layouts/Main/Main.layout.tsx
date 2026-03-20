// Types
import type { ReactNode } from "react";
// Components
import { Header } from "./components/Header/Header";
// Styles
import "./Main.layout.css";
import clsx from "clsx";

type Props = { children: ReactNode; className?: string };

export const MainLayout = ({ children, className }: Props) => {
  return (
    <>
      <Header />
      <main className={clsx("main-layout", className)}>{children}</main>
    </>
  );
};
