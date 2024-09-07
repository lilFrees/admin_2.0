"use client";

import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      session: null,

      setUser: (user) => {
        set({ user });
      },

      clearUser: async () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
