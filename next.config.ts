
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        '*.firebaseapp.com',
        '*.web.app',
      ],
    },
  },
};

export default nextConfig;
