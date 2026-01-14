"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/features/auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/features/firebase/config";
import { useRouter } from "next/navigation";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button
} from "@heroui/react";
import Link from "next/link";
import WEMLogo from "@/components/common/WEMLogo";

function ManagementNavbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/management/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <Navbar isBordered className="bg-white shadow-sm">
      <NavbarBrand>
        <Link href="/management" className="font-bold text-xl text-inherit hover:text-blue-600 transition-colors">
          <WEMLogo width={72} height={72} />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link href="/management" className="text-foreground hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/management/invoice-editor" className="text-foreground hover:text-blue-600 transition-colors">
            Nová faktura
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="light"
                className="gap-2 px-2"
              >
                <Avatar
                  isBordered
                  color="primary"
                  size="sm"
                  src={user.photoURL || undefined}
                  name={user.displayName || user.email || "User"}
                />
                <span className="hidden sm:block font-medium">
                  {user.displayName || user.email}
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu actions">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Přihlášen jako</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger"
                onClick={handleLogout}
              >
                Odhlásit se
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

function ManagementLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ManagementNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ManagementLayoutContent>{children}</ManagementLayoutContent>
    </AuthProvider>
  );
}
