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
};
