/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fisimate-api-gg6y243dza-et.a.run.app",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
