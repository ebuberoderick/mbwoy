/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.viloxapp.com', "https://"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.viloxapp.com',
            },
        ],
    }
};

export default nextConfig;
