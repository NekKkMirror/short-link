export interface ShortenedLink {
  id: string
  shortUrl: string
  originalUrl: string
  alias?: string
  createdAt: Date
  expiresAt: Date | null
  clickCount: number
}
