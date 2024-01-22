import type { ReactNode } from "react";

import { MenuBar } from "../MenuBar";



interface AppLayoutProps {
  className: string;
  children: ReactNode;
}

export function AppLayout({ className, children }: Readonly<AppLayoutProps>) {
  return (
    <div className={`${className} container box-border h-screen`}>
      <MenuBar />
      {children}
    </div>
  );
}