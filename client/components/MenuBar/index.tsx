import { GanttChartSquare, Home, LineChart } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "../ThemeToggle";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../ui/menubar";



export function MenuBar() {
  return (
    <Menubar className="justify-between pr-0">
      <MenubarMenu>
        <MenubarTrigger>Pages</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={"/"} className="flex gap-2">
              <Home size="20"/>
              Home
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href={"/charts"} className="flex gap-2">
              <LineChart size="20" />
              Charts
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href={"/summary"} className="flex gap-2">
              <GanttChartSquare size="20"/>
              Summary
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <ThemeToggle />
      </MenubarMenu>
    </Menubar>

  );
}