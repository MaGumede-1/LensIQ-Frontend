/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:8080/api/auth/:path*',
      },
      {
        source: '/api/customers/:path*',
        destination: 'http://localhost:8080/api/customers/:path*',
      },
      {
        source: '/api/subscriptions/:path*',
        destination: 'http://localhost:8080/api/subscriptions/:path*',
      },
      {
        source: '/api/billing/:path*',
        destination: 'http://localhost:8080/api/billing/:path*',
      },
      {
        source: '/api/images/:path*',
        destination: 'http://localhost:5000/api/images/:path*',
      },
      {
        source: '/api/batches/:path*',
        destination: 'http://localhost:5000/api/batches/:path*',
      },
    ];
  },
};

export default nextConfig;
