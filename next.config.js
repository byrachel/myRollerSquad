module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        { loader: "@svgr/webpack", options: { icon: true, focusable: true } },
      ],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // hostname: "s3.eu-west-3.amazonaws.com",
        // pathname: "/mys3rollerpicts/**",
      },
    ],
  },
};
