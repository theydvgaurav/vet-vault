"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios
    from 'axios';
interface AuthState {
    isAuthenticated: boolean;
    user: any;
    login: (mobile: string, password: string) => void;
    logout: () => void;
}



// export const useAuth = create<AuthState>()(
//     persist(
//         (set) => {
//         return ({
//     isAuthenticated: false,
//     user: null,
//     login: async (mobile: string, password: string) => {
//         try {
//             const response = await axios.post('/api/login', { mobile, password });
//             console.log(response)
//             if (response.status != 200)
//                 throw new Error('Something went wrong!');
//             const data = response.data
//             set({ isAuthenticated: true, user: { ...data } });
//         }
//         catch (err) {
//             set({ isAuthenticated: false, user: null })
//             throw new Error('Something went wrong!');
//         }
//     },
//     logout: () => set({ isAuthenticated: false, user: null }),
// })),
// {
//     name: 'auth-storage',
//         }
//     }
// ;

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => {
            const storedData = typeof window !== 'undefined'
                ? JSON.parse(localStorage.getItem('auth-storage') || '{}')
                : {};

            const initialAuthState = storedData?.state || {
                isAuthenticated: false,
                user: null,
            };

            return {
                isAuthenticated: initialAuthState.isAuthenticated || false,
                user: initialAuthState.user || null,
                login: async (mobile: string, password: string) => {
                    try {
                        const response = await axios.post('/api/login', { mobile, password });
                        if (response.status !== 200) {
                            throw new Error('Something went wrong!');
                        }
                        const data = response.data;
                        set({ isAuthenticated: true, user: { ...data } });
                    } catch (err) {
                        set({ isAuthenticated: false, user: null });
                        throw new Error('Something went wrong!');
                    }
                },
                logout: () => set({ isAuthenticated: false, user: null }),
            };
        },
        {
            name: 'auth-storage', // Key used in local storage
        }
    )
);
