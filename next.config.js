/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.clerk.dev', 'bwsobaeipffoftenykgp.supabase.co'],
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
