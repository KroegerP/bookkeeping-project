import { Film, GanttChartSquare, Home, LineChart, Music } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "../ThemeToggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigationMenu";



const navItemClass = "transition-colors flex items-center gap-2 hover:bg-blue-500 py-2 px-4";

export function NaviagationBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="w-screen justify-start p-1 bg-blue-600 text-white dark:text-black">
        <h1 className="mx-[2%] text-2xl">
          Peter&apos;s Personal Site
        </h1>
        <NavigationMenuItem>
          <Link href={"/"} legacyBehavior passHref >
            <NavigationMenuLink className={navItemClass}>
              <Home size="20"/>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/charts"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navItemClass}>
              <LineChart size="20" />
              Charts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/summary"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navItemClass}>
              <GanttChartSquare size="20"/>
              Summary
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/music"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navItemClass}>
              <Music size="20"/>
              Music
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/movies"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navItemClass}>
              <Film size="20"/>
              Movies
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="absolute right-1">
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}