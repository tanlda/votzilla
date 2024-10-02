/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localeDetection: false,
  },
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL || 'https://api.votzilla.com',
    COOKIE_ACCESS_TOKEN: '_t',
    COOKIE_REFRESH_TOKEN: '_r',
  },
  images: {},
}

export default nextConfig
