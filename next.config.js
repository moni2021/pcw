/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        outputFileTracingIncludes: {
            '/src/lib/data/workshops/**': ['./src/lib/data/workshops/**/*'],
        },
    },
};

module.exports = nextConfig;
