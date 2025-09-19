"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  User,
  LayoutDashboard,
  Briefcase,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  useRouter,
  usePathname,
} from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

// Navigation structure for screenEasy
const navigationItems = {
  active: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: Briefcase,
    },
  ],
  comingSoon: [],
};

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const isActiveRoute = (href: string) => {
    return path === href;
  };

  const handleLogout = () => {
    handleSignOut();
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.user_metadata?.name) return "U";
    return user?.user_metadata?.name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Desktop Vertical Navbar */}
      <nav className="hidden lg:flex flex-col h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 z-50">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <div className="cursor-pointer flex items-center gap-3">
            <Logo size="md" />
            <span className="text-xl font-bold text-gray-900">
              screenEasy
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Active Items */}
          <div className="mb-8">
            <div className="px-3 py-2 mb-3">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Navigation
              </span>
            </div>
            <div className="space-y-1">
              {navigationItems.active.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActiveRoute(item.path)
                        ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActiveRoute(item.path)
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Info and Logout */}
        <div className="border-t border-gray-200 px-4 py-4 bg-gray-50/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">
                {getUserInitials()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {(
                  user?.user_metadata?.name || "User"
                ).replace(/\b\w/g, (char: string) => char.toUpperCase())}
              </p>
              <p className="text-xs text-gray-500">Active User</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start space-x-2 text-gray-700 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-3">
            <Logo size="md" />
            <span className="text-xl font-bold text-gray-900">
              screenEasy
            </span>
          </div>

          {/* Burger Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <SheetTitle>
                  <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div className="cursor-pointer flex items-center gap-3">
                      <Logo size="md" />
                      <span className="text-xl font-bold text-gray-900">
                        screenEasy
                      </span>
                    </div>
                  </div>
                </SheetTitle>

                {/* Mobile Navigation Items */}
                <div className="flex-1 px-6 py-4 overflow-y-auto">
                  {/* Active Items */}
                  <div className="mb-8">
                    <div className="px-3 py-2 mb-4">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Navigation
                      </span>
                    </div>
                    <div className="space-y-2">
                      {navigationItems.active.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActiveRoute(item.path)
                                ? "bg-blue-50 text-blue-600 border border-blue-200"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <div>
                              <span>{item.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile User Info and Logout */}
                <div className="border-t border-gray-200 p-6 bg-gray-50/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white font-semibold text-sm">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {(
                          user?.user_metadata?.name || "User"
                        ).replace(/\b\w/g, (char: string) => char.toUpperCase())}
                      </p>
                      <p className="text-xs text-gray-500">Active User</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start space-x-2 text-gray-700 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Content Spacer for Desktop */}
      <div className="hidden lg:block lg:ml-64" />

      {/* Content Spacer for Mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
}
