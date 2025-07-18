import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuth: !!window.localStorage.getItem('token'),
  infog:{},
  loading: true,
  isAdmin: false,
  setIsAuth: (value) => set({ isAuth: value }),
  setInfog: (value) => set({ 
    isAdmin: value.user.role === 'admin' ? true : false,    
    infog: value 
    
  }),
  setLoading: (value) => set({ loading: value }),
}))