/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ];
    }
};

export default nextConfig;
