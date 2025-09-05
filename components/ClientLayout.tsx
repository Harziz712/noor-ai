"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthProvider";
import BottomNav from "@/components/ui/BottomNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // hide BottomNav on auth pages
  const hideNavRoutes = [ "/Auth", "/Auth/Login", "/Auth/SignUp", "/chat"];
  const shouldShowNav = !hideNavRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
      <AuthProvider>
      {children}
      {shouldShowNav && <BottomNav />}
      </AuthProvider>
  );
}
