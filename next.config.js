// next.config.js
// or named export
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'NextRemote',
        remotes: {
          NextRemote: `NextRemote@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './TrustedProfile': './components/TrustedProfile.tsx',
        },
        extraOptions: {
          exposePages: true,
        },
        shared: {
          // whatever else
        },
      })
    );

    return config;
  },
};
