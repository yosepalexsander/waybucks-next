/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
      image: '/assets/images/no_data.svg'
    }
  },
})

module.exports = withBundleAnalyzer(nextConfig)