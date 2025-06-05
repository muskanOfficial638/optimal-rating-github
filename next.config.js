// const { i18n } = require('./next-i18next.config.js');

module.exports = {
  // basePath: '/staging',  // Ensure base path if the app runs under a subpath
  // assetPrefix: '/staging/_next',  // Helps with serving assets under a subpath
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // i18n,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
  images: {
    domains: [
      "server.optimalrating.com",
      // 'staging.server.optimalrating.com'
    ],
  },
};
