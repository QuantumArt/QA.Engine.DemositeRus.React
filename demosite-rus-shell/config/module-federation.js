const {
    container: { ModuleFederationPlugin },
  } = require('webpack'),
  { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node'),
  pkg = require('../package.json'),
  remotes = {
    //local
    //qp_widgets_platform_modules: 'qp_widgets_platform_modules@http://localhost:3201/static',
    //dev
    //qp_widgets_platform_modules:
    //   'qp_widgets_platform_modules@https://react-modules.demositerus.dev.qsupport.ru/static',
    //prod
    qp_widgets_platform_modules:
      'qp_widgets_platform_modules@https://react-modules.demositerus.qsupport.ru/static',
  },
  getRemotes = (e, r) => Object.keys(e).reduce((t, o) => ({ ...t, [o]: `${e[o]}${r}` }), {}),
  shared = {
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
