import { create } from "zustand";

const useStore = create((set) => ({
  username: "",
  setUsername: (newUsername) => set({ username: newUsername }),
  logout: () => set({ username: "" }), //  funcion de logout
}));

export default useStore;
