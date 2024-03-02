/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        API_PROTOCOL: process.env.API_PROTOCOL,
        API_HOST: process.env.API_HOST,
        ...(process.env.API_PORT ? {API_PORT: process.env.API_PORT} : {}),
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: process.env.API_PROTOCOL,
                hostname: process.env.API_HOST,
                ...(process.env.API_PORT ? {port: process.env.API_PORT} : {}),
                pathname: "/uploads/**"
            },
        ],
    }
}

module.exports = nextConfig