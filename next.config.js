/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  reactStrictMode: true,

  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
      {
        source: "/i/:token",
        destination: "/auth/signup?code=:token",
      },
    ];
  },
};
