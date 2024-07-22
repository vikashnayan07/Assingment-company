import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: {
    email: "",
    active: false,
  },
  setEmail: (name) =>
    set((state) => ({
      auth: { ...state.auth, email: name },
    })),
}));

export default useAuthStore;
