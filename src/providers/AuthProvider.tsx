"use client";

import useAuthStore from "@/stores/useAuthStores";
import { axiosInstance } from "@/utils/axios-instance";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setUser } = useAuthStore();

  const onSessionLogin = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/session-login", {
        headers: {
          Authorization: `Bearer ${user.objectId}`,
        },
      });

      setUser({
        name: response.data.data.name,
        email: response.data.data.email,
        objectId: response.data.data.objectId,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // componentDidUpdate
  useEffect(() => {
    if (user.objectId) {
      onSessionLogin();
    }
  }, [user?.objectId]);

  return <>{children}</>;
}
