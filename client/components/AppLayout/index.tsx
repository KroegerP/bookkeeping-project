import type { ReactNode } from "react";



interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="box-border">
      {children}
    </div>
  );
}