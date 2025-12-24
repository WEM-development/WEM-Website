"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/src/features/auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/src/features/firebase/config";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/management/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Odhlásit se</span>
      </button>
    </div>
  );
}

function ManagementLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1">
      <LogoutButton />
      {children}
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
