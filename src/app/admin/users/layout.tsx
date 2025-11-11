import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage user roles and permissions - Admin only",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
