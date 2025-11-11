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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Shield,
  Users,
  Mail,
  Calendar,
  Loader2,
  AlertCircle,
  Ban,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface User {
  objectId: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  created?: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin, user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [suspendingUserId, setSuspendingUserId] = useState<String | null>(null);

  //alert dialog state
  const [showSuspendDialog, setShowSuspendDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<"suspend" | "activate">(
    "suspend"
  );

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

  // open suspend/activate confirmation dialog
  const openStatusDialog = (user: User, action: "suspend" | "activate") => {
    setSelectedUser(user);
    setActionType(action);
    setShowSuspendDialog(true);
  };

  // handle user status change (suspend/activate)
  const handleStatusChange = async () => {
    if (!selectedUser) return;

    const newStatus = actionType === "suspend" ? "suspended" : "active";

    try {
      setSuspendingUserId(selectedUser.objectId);

      const response = await axiosInstance.put(
        `/api/admin/users/${selectedUser.objectId}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        // update local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.objectId === selectedUser.objectId
              ? { ...user, status: newStatus }
              : user
          )
        );

        const message =
          newStatus === "suspended"
            ? "User account suspended successfully"
            : "User account activated successfully";
        toast.success(message);
      } else {
        toast.error(response.data.messgae || "Failed to update user status");
      }
    } catch (error: any) {
      console.error("Error updating user status:", error);

      if (error.response?.status === 403) {
        toast.error(
          error.response?.data?.message || "You cannot change your own status"
        );
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update user status"
        );
      }
    } finally {
      setSuspendingUserId(null);
      setShowSuspendDialog(false);
      setSelectedUser(null);
    }
  };

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <>
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
                  Manage user roles, permissions, and account status
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
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.status !== "suspended").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.status === "suspended").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Suspended</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.role === "admin").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Admins</p>
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
                const isSuspended = user.status === "suspended";

                return (
                  <Card
                    key={user.objectId}
                    className={`hover:shadow-md transition-shadow ${
                      isCurrentUser ? "border-primary" : ""
                    } ${isSuspended ? "opacity-60 bg-muted/50" : ""}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap shrink-0">
                            <CardTitle className="text-lg truncate flex items-center gap-2">
                              {user.name}
                              <Badge
                                variant={
                                  user.role === "admin"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {user.role}
                              </Badge>
                            </CardTitle>
                            {isCurrentUser && (
                              <Badge variant="outline" className="shrink-0">
                                You
                              </Badge>
                            )}
                            {isSuspended && (
                              <Badge variant="destructive" className="shrink-0">
                                <Ban className="w-3 h-3 mr-1" />
                                Suspended
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

                        <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto space-y-2">
                          {/* Role Selector */}
                          <Select
                            value={user.role}
                            onValueChange={(value) =>
                              handleRoleChange(user.objectId, value)
                            }
                            disabled={
                              updatingUserId === user.objectId || isCurrentUser
                            }
                          >
                            <SelectTrigger className="w-full sm:w-[140px]">
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

                          {/* Suspend/Activate Button */}
                          {!isCurrentUser && (
                            <Button
                              variant={isSuspended ? "outline" : "destructive"}
                              onClick={() =>
                                openStatusDialog(
                                  user,
                                  isSuspended ? "activate" : "suspend"
                                )
                              }
                              className="w-full sm:w-auto"
                              disabled={suspendingUserId === user.objectId}
                            >
                              {suspendingUserId === user.objectId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : isSuspended ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Activate
                                </>
                              ) : (
                                <>
                                  <Ban className="w-4 h-4 mr-1" />
                                  Suspend
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      {isCurrentUser && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>
                            You cannot change your own role or suspend your
                            account
                          </span>
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

      {/* Suspend/Activate Confirmation Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "suspend"
                ? "Suspend User Account?"
                : "Activate User Account?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "suspend" ? (
                <>
                  Are you sure you want to suspend{" "}
                  <strong>{selectedUser?.name}</strong>'s account? They will not
                  be able to log in until reactivated.
                </>
              ) : (
                <>
                  Are you sure you want to activate{" "}
                  <strong>{selectedUser?.name}</strong>'s account? They will be
                  able to log in again.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!suspendingUserId}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={!!suspendingUserId}
              className={
                actionType === "suspend"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {suspendingUserId ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : actionType === "suspend" ? (
                "Suspend Account"
              ) : (
                "Activate Account"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
