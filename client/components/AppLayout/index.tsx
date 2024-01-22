import type { ReactNode } from "react";

import { MenuBar } from "../MenuBar";



interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <div className="container box-border">
      <MenuBar />
      {children}
    </div>
  );
}