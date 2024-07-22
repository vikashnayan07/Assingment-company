import { create } from "zustand";

const useStore = create((set) => ({
  token: localStorage.getItem("token") || "",
  setToken: (token) => set({ token }),
  removeToken: () => set({ token: "" }),
}));

export default { useStore };
