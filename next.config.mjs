/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "", // Optional, you can leave it empty if not needed
      },
    ],
  },
  swcMinify: true, // Enable SWC minifier
  compress: true, // Enable gzip compression
};

export default nextConfig;
