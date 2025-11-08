import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  objectId: string;
  name: string;
  email: string;
  role?: string;
}

interface UseAuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  isAdmin: () => boolean;
}

const useAuthStore = create<UseAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAdmin() {
        const state = get();
        return state.user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
