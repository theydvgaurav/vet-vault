import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { label: "Pet Listing", href: "/pet-listing" },
    { label: "Add Pet", href: "/add-pet" },
    { label: "Schedule", href: "/schedule" },
  ];
  return (
    <nav className="bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/pet-listing" className="flex items-center space-x-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Vet Vault</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          {isAuthenticated && <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              {(
                <Button variant="outline" onClick={handleLogout}>
                  Sign Out
                </Button>
              )}
            </div>
          </div>}

          {/* Mobile menu button */}
          {<div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isAuthenticated && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {(
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full mt-2"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}