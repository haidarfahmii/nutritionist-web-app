"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { axiosInstance } from "@/utils/axios-instance";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Mail,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface User {
  objectId: string;
  name: string;
  email: string;
  role: string;
  created?: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Redirect jika bukan admin
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access this page");
      router.push("/login?redirect=/admin/users");
      return;
    }

    if (!isAdmin()) {
      toast.error("Access denied. Admin only.");
      router.push("/");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAuthenticated || !isAdmin()) {
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/admin/users");

        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to load users");
        }
      } catch (error: any) {
        console.error("Error fetching users:", error);

        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          router.push("/login?redirect=/admin/users");
        } else if (error.response?.status === 403) {
          toast.error("Access denied. Admin only.");
          router.push("/");
        } else {
          toast.error(error.response?.data?.message || "Failed to load users");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, isAdmin, router]);

  // Update user role
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setUpdatingUserId(userId);

      const response = await axiosInstance.put(`/api/admin/users/${userId}`, {
        role: newRole,
      });

      if (response.data.success) {
        // Update local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.objectId === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success("User role updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update user role");
      }
    } catch (error: any) {
      console.error("Error updating user role:", error);

      if (error.response?.status === 403) {
        toast.error(
          error.response?.data?.message ||
            "You cannot change your own admin role"
        );
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update user role"
        );
      }
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <main className="min-h-screen py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">
                Manage user roles and permissions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Admins</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter((u) => u.role === "user").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Regular Users</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : users.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No users found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {users.map((user) => {
              const isCurrentUser = user.objectId === currentUser?.objectId;

              return (
                <Card
                  key={user.objectId}
                  className={`hover:shadow-md transition-shadow ${
                    isCurrentUser ? "border-primary" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg truncate">
                            {user.name}
                          </CardTitle>
                          {isCurrentUser && (
                            <Badge variant="outline" className="shrink-0">
                              You
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex flex-col gap-2">
                          <span className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </span>
                          {user.created && (
                            <span className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              Joined {formatDate(new Date(user.created))}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge
                          variant={
                            user.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                        <Select
                          value={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user.objectId, value)
                          }
                          disabled={
                            updatingUserId === user.objectId || isCurrentUser
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            {updatingUserId === user.objectId ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <SelectValue />
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {isCurrentUser && (
                      <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>You cannot change your own role</span>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
