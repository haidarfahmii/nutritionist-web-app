"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { axiosInstance } from "@/utils/axios-instance";
import { toast } from "react-toastify";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, setUser, clearSession } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const hasRestoredSession = useRef(false);

  // restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      // skip if already restored or no session
      if (hasRestoredSession.current || !session?.objectId) {
        return;
      }

      try {
        const response = await axiosInstance.post("/api/auth/session-login", {
          objectId: session.objectId,
        });

        if (response.data.success) {
          setUser(response.data.data);
          hasRestoredSession.current = true;
          console.log("Session restored successfully");
        } else {
          // Session invalid, clear
          clearSession();
          toast.error("Session expired. Please login again.");

          // Redirect to login if on protected route
          const protectedRoutes = [
            "/dashboard",
            "/profile",
            "/blog/create",
            "/blog/edit",
          ];
          const isProtected = protectedRoutes.some((route) =>
            pathname?.startsWith(route)
          );

          if (isProtected) {
            router.push("/login");
          }
        }
      } catch (error: any) {
        console.error("Session restore failed:", error);
        clearSession();

        // Only show toast on protected routes
        const protectedRoutes = [
          "/dashboard",
          "/profile",
          "/blog/create",
          "/blog/edit",
        ];
        const isProtected = protectedRoutes.some((route) =>
          pathname?.startsWith(route)
        );

        if (isProtected) {
          toast.error("Session expired. Please login again.");
          router.push("/login");
        }
      }
    };

    restoreSession();
  }, [session?.objectId]); // Only run when objectId changes

  return <>{children}</>;
}
