/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com', // O domínio do site original
                pathname: '**', // Permite qualquer subpasta
            }
        ]
    }
};


export default nextConfig;
