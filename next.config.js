/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["jobspot-example.netlify.app", "firebasestorage.googleapis.com"]
  }
}

module.exports = nextConfig
