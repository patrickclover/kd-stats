interface Metadata {
  hasPlayedModernWarfare: boolean
  lastUpdated: {
    displayValue: unknown
    value: unknown
  }
}

interface Stat {
  category: string
  displayCategory: string
  displayName: string
  displayType: string
  displayValue: string
  metadata: unknown
  percentile: number
  rank: number
  value: number
}

interface PlatformInfo {
  additionalParameters: null
  avatarUrl: string
  platformSlug: string
  platformUserHandle: string
  platformUserId: string
  platformUserIdentifier: string
}

export interface Segment {
  attributes: unknown
  expiryDate: string
  metadata: { name: string }
  stats: { [key: string]: Stat }
  type: string
}

interface UserInfo {
  countryCode: null
  customAvatarUrl: null
  customHeroUrl: null
  isInfluencer: boolean
  isPremium: boolean
  isVerified: boolean
  pageviews: null
  socialAccounts: string[]
  userId: null
}

export interface KD {
  availableSegments: unknown
  expiryDate: string
  metadata: Metadata
  platformInfo: PlatformInfo
  segments: Segment[]
  userInfo: UserInfo
}
