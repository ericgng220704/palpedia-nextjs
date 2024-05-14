/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: true,
     images: {
          remotePatterns: [
               {
                    protocol: "https",
                    hostname: "firebasestorage.googleapis.com",
                    port: "",
               },
               {
                    protocol: "https",
                    hostname: "lh3.googleusercontent.com",
                    port: "",
               },
          ],
     },
};

export default nextConfig;
