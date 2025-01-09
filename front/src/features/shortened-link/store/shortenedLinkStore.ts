import { defineStore } from 'pinia'
import api from '@services/api.service.ts'
import { reactive } from 'vue'
import { ShortenedLink } from '@features/shortened-link/interfaces/shortened-link.js'

export const useShortenedLinkStore = defineStore('shortenedLink', {
  state: () => ({
    links: [] as Array<ShortenedLink>,
    linkInfo: null as ShortenedLink | null,
    selectedLinkId: null as string | null,
    loading: false,
    creationMode: true,
  }),
  getters: {
    selectedLink(state): ShortenedLink | null {
      return state.links.find(link => link.id === state.selectedLinkId) || null
    },
  },
  actions: {
    toggleCreationMode() {
      this.creationMode = !this.creationMode
      if (this.creationMode) {
        this.linkInfo = null
        this.selectedLinkId = null
      }
    },
    async createLink(originalUrl: string, alias?: string, expiresAt?: string) {
      try {
        const params = {
          originalUrl,
          ...(alias ? { alias } : {}),
          ...(expiresAt ? { expiresAt } : {}),
        }
        const { data } = await api.post('/shortened-link', params)
        this.links.push(data)
        this.creationMode = false
      } catch (error) {
        console.error('Error creating link:', error)
        throw error
      }
    },
    async fetchLinkInfo(shortUrl: string) {
      try {
        this.loading = true
        const { data } = await api.get(`/shortened-link/info/${shortUrl}`)
        this.linkInfo = reactive({ ...data })
        this.selectedLinkId = data.id
        this.creationMode = false
      } catch (error) {
        console.error('Error fetching link info:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async deleteLink(shortUrl: string) {
      try {
        await api.delete(`/shortened-link/${shortUrl}`)
        this.links = this.links.filter(link => link.shortUrl !== shortUrl)

        if (this.linkInfo?.shortUrl === shortUrl) {
          this.linkInfo = null
          this.selectedLinkId = null
        }
      } catch (error) {
        console.error('Error deleting link:', error)
        throw error
      }
    },
  },
})
