export const APP_NAME = 'GNews'

export const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'world', label: 'World' },
  { key: 'india', label: 'India' },
  { key: 'business', label: 'Business' },
  { key: 'technology', label: 'Technology' },
  { key: 'sports', label: 'Sports' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'health', label: 'Health' },
  { key: 'science', label: 'Science' },
]

export const DEFAULT_PAGE_SIZE = 12

export const ROUTES = {
  HOME: '/',
  NEWS_DETAIL: '/news/:id',
  CATEGORY: '/category/:type',
  SEARCH: '/search',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  BECOME_ADVERTISER: '/become-advertiser',
  ADMIN_LOGIN: '/admin/login',
  ADMIN: '/admin',
}

export const QUICK_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Become an Advertiser', to: '/become-advertiser' },
]
