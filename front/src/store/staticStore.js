import { create } from 'zustand'

export const useStaticStore = create((set) => ({
  staticList: [],
  loading: false,
  setStatic: (value) => set({ staticList: value }),
  setLoading: (value) => set({ loading: value }),
}))   