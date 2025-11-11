"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, LogOut, Shield, Users } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    router.push("/login");
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-sidebar/40 text-sidebar-foreground backdrop-blur-sm md:border-b md:bg-sidebar md:backdrop-blur-none ">
      <nav
        className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="Nutritionist home"
        >
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={45}
            height={45}
            className="h-9 w-9 lg:h-11 lg:w-11"
            aria-hidden="true"
          />
          <span className="text-xl lg:text-2xl font-bold">Nutritionist</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:space-x-7">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition-colors hover:text-primary flex items-center ${
                pathname === item.href
                  ? "text-primary"
                  : "text-sidebar-foreground/80"
              }`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                  aria-label={`User menu for ${user.name}`}
                >
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled className="cursor-default">
                  <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span className="capitalize">
                    Role: {user.role || "user"}
                  </span>
                </DropdownMenuItem>

                {/* Admin Menu - Hanya tampil jika user adalah admin */}
                {isAdmin() && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/admin/users")}
                      className="cursor-pointer"
                    >
                      <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>User Management</span>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleLogin}
              variant="default"
              className="cursor-pointer"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t bg-sidebar/20 text-sidebar-foreground backdrop-blur-sm"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4 space-y-4 ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-sidebar-foreground/80"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              {isAuthenticated && user ? (
                <>
                  <div className="space-y-1 pb-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                    <p className="text-xs text-muted capitalize">
                      Role: {user.role || "user"}
                    </p>
                  </div>

                  {/* Admin Menu untuk Mobile */}
                  {isAdmin() && (
                    <Button
                      onClick={() => {
                        router.push("/admin/users");
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full bg-accent text-accent-foreground"
                    >
                      <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                      User Management
                    </Button>
                  )}

                  <Button
                    onClick={handleLogout}
                    variant="default"
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogin}
                  variant="default"
                  className="w-full"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
