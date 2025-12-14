import { create } from "zustand";

interface ToastState {
  message: string;
  show: boolean;
  notify: (msg: string) => void;
  hide: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: "",
  show: false,
  notify: (msg: string) => set({ message: msg, show: true }),
  hide: () => set({ show: false }),
}));
