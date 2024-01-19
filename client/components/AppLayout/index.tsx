import type { ReactNode } from "react";

import { ThemeToggle } from "../ThemeToggle";



interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <div className="box-border">
      <div className="absolute top-2 right-2"><ThemeToggle /></div>
      {children}
    </div>
  );
}