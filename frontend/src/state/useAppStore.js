import { create } from "zustand";

export const useAppStore = create((set) => ({
  isBootstrapped: false,
  setBootstrapped: (value) => set({ isBootstrapped: Boolean(value) }),

  apiStatus: "idle",
  setApiStatus: (status) => set({ apiStatus: status }),

  lastApiError: "",
  setLastApiError: (message) => set({ lastApiError: String(message || "") }),
}));

