/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://frontend-api.pump.fun/:path*',
      },
    ];
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;