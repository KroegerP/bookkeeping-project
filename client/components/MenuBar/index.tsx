import Link from "next/link";

import { ThemeToggle } from "../ThemeToggle";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../ui/menubar";



export function MenuBar() {
  return (
    <Menubar className="justify-between pr-0">
      <MenubarMenu>
        <MenubarTrigger>Pages</MenubarTrigger>
        <MenubarContent>
          <MenubarItem><Link href={"/"}>Home</Link></MenubarItem>
          <MenubarSeparator />
          <MenubarItem><Link href={"/Example"}>Charts</Link></MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <ThemeToggle />
      </MenubarMenu>
    </Menubar>

  );
}