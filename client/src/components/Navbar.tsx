import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Button variant="link" className="font-bold text-xl text-amber-500 dark:text-amber-400 p-0">
            {business?.basic_info.name || 'Loading...'}
          </Button>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/">
            <Button variant="ghost" className="text-sm font-medium text-zinc-900 dark:text-white">Home</Button>
          </Link>
          <Link href="/residential">
            <Button variant="ghost" className="text-sm font-medium text-zinc-900 dark:text-white">Residential</Button>
          </Link>
          <Link href="/commercial">
            <Button variant="ghost" className="text-sm font-medium text-zinc-900 dark:text-white">Commercial</Button>
          </Link>
          <Link href="/industrial">
            <Button variant="ghost" className="text-sm font-medium text-zinc-900 dark:text-white">Industrial</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="mr-4"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-amber-500" />
            )}
          </Button>
          <Button 
            size="sm" 
            variant="default" 
            className="bg-amber-500 hover:bg-amber-600 text-black dark:text-black"
          >
            <Phone className="mr-2 h-4 w-4" />
            {business?.basic_info.phone || 'Contact Us'}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            className="md:hidden bg-amber-500 hover:bg-amber-600" 
            variant="default" 
            size="icon"
          >
            <Phone className="h-4 w-4 text-black" />
          </Button>
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/residential">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Residential
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/commercial">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Commercial
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/industrial">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Industrial
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}