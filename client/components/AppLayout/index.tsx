import type { ReactNode } from "react";

import { NaviagationBar } from "../NavigationBar";



interface AppLayoutProps {
  className: string;
  children: ReactNode;
}

export function AppLayout({ className, children }: Readonly<AppLayoutProps>) {
  return (
    <div className={`${className} h-screen`}>
      <NaviagationBar />
      <div className="container box-border">
        {children}
      </div>
    </div>
  );
}