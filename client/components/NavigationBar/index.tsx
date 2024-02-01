import { GanttChartSquare, Home, LineChart } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "../ThemeToggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigationMenu";



export function NaviagationBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="w-screen justify-start">
        <NavigationMenuItem>
          <Link href={"/"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home size="20"/>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/charts"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <LineChart size="20" />
              Charts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/summary"} legacyBehavior passHref className="flex gap-2">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <GanttChartSquare size="20"/>
              Summary
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="absolute right-0">
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}