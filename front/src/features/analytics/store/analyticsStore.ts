import { defineStore } from 'pinia'
import api from '@services/api.service.ts'

interface AnalyticsList {
  totalClicks: number
  recentClicks: Array<{
    ipAddress: string
    clickedAt: Date
  }>
}

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    analytics: new Map() as Map<string, AnalyticsList>,
    loading: false,
  }),
  actions: {
    async fetchAnalytics(shortUrl: string) {
      this.loading = true
      try {
        const { data } = await api.get(`/analytics/list-by-link/${shortUrl}`)
        this.analytics.set(shortUrl, data)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
