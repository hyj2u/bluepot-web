/** @type {import('next').NextConfig} */


// PWA
const prod = process.env.NODE_ENV === "production";
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: prod ? false : true,
  buildExcludes: [/middleware-manifest\.json$/],
});



const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  trailingSlash: true,

  images: {
    // unoptimized: false,
    domains: ["imagedelivery.net", "res.cloudinary.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [600, 768, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

  

    return config;
  },
};
module.exports = withPWA(nextConfig);
