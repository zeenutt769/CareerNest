import { create } from 'zustand'

export const useJobStore = create((set) => ({
    jobs: [],
    filters: {
        search: '',
        location: [],
        experience: [],
        salaryMin: 0,
        salaryMax: 100,
    },
    setJobs: (jobs) => set({ jobs }),
    setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
    })),
    user: {
        name: 'Rahul Sharma',
        avatar: 'RS',
        location: 'Mumbai, IN',
        title: 'B.Tech CSE • 2025'
    },
}))
