import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  name: string;
  objectId: string;
}

interface UseAuthStore {
  user: User;
  setUser: (user: User) => void;
}

const UseAuthStore = create<UseAuthStore>()(
  persist(
    (set) => ({
      user: {
        email: "",
        name: "",
        objectId: "",
      },
      setUser: (user) => set({ user: user }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: {
          objectId: state.user.objectId,
        },
      }),
    }
  )
);

export default UseAuthStore;
