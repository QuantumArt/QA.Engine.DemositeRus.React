const {
  container: { ModuleFederationPlugin },
} = require('webpack');
const { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node');
const pkg = require('../package.json');

const remotes = {
  //local
  //qp_widgets_platform_modules: 'qp_widgets_platform_modules@http://localhost:3201/static',
  //prod
  qp_widgets_platform_modules:
    'qp_widgets_platform_modules@||***qp_widgets_platform_modules***||/static',
};
const getRemotes = (e, r) => Object.keys(e).reduce((t, o) => ({ ...t, [o]: `${e[o]}${r}` }), {});

const shared = {
  ...pkg.dependencies,
  react: { singleton: !0, requiredVersion: pkg.dependencies.react },
  'react-dom': { singleton: !0, requiredVersion: pkg.dependencies['react-dom'] },
  'react-router-dom': { singleton: !0 },
  '@quantumart/qp8-widget-platform-bridge': { singleton: !0 },
};

module.exports = {
  client: new ModuleFederationPlugin({
    name: 'qp_widgets_platform_shell',
    filename: 'remoteEntry.js',
    remotes: getRemotes(remotes, '/client/remoteEntry.js'),
    shared,
  }),
  server: [
    new NodeFederationPlugin({
      name: 'qp_widgets_platform_shell',
      library: { type: 'commonjs-module' },
      remotes: getRemotes(remotes, '/server/remoteEntry.js'),
      shared,
      filename: 'remoteEntry.js',
    }),
    new StreamingTargetPlugin({
      name: 'qp_widgets_platform_shell',
      library: { type: 'commonjs-module' },
      remotes: getRemotes(remotes, '/server/remoteEntry.js'),
    }),
  ],
};
