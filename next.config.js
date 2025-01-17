// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

const path = require('path');

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['static.alchemyapi.io', 'etherscan.io', 'app.picante.io', 'd2b5do6l860fxo.cloudfront.net'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/portfolio',
        permanent: false,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
