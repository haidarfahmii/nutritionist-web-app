import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  objectId: string;
  name: string;
  email: string;
  role?: string;
}

interface UseAuthStore {
  // minimal session data
  session: {
    objectId: string;
    role?: string;
  } | null;

  // full user data (not persisted)
  user: User | null;
  isAuthenticated: boolean;

  // actions
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  clearSession: () => void;

  // hepler function
  isAdmin: () => boolean;
  canModerate: () => boolean;
}

const useAuthStore = create<UseAuthStore>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isAuthenticated: false,

      login: (user) =>
        set({
          session: { objectId: user.objectId, role: user.role },
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          session: null,
          user: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),
      clearSession: () =>
        set({
          session: null,
          user: null,
          isAuthenticated: false,
        }),

      // check if user admin
      isAdmin() {
        const state = get();
        return state.user?.role === "admin";
      },

      canModerate() {
        const state = get();
        return state.user?.role === "admin";
      },
    }),
    {
      name: "auth-session",
      partialize: (state) => ({
        session: state.session,
      }),
    }
  )
);

export default useAuthStore;
