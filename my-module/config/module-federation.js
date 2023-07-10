const {
    container: { ModuleFederationPlugin },
  } = require('webpack'),
  { NodeFederationPlugin, StreamingTargetPlugin } = require('@module-federation/node'),
  pkg = require('../package.json'),
  exposes = {
    './start_page': './src/components/pages/start-page/start-page',
    './redirect_page': './src/components/pages/redirect-page/redirect-page',
    './text_page': './src/components/pages/text-page/text-page',
    './media_page': './src/components/pages/media-page/media-page',
    './news_page': './src/components/pages/news-page/news-page',
    './search_result_page': './src/components/pages/search-result-page/search-result-page',
    './sitemap_page': './src/components/pages/sitemap-page/sitemap-page',
    //widgets
    './html_widget': './src/components/widgets/html-widget/html-widget',
    './search_bar_widget': './src/components/widgets/search-bar-widget/search-bar-widget',
    './foldboxlist_widget': './src/components/widgets/foldboxlist-widget/foldboxlist-widget',
    './subscribe_widget': './src/components/widgets/subscribe-widget/subscribe-widget',
    './feedback_widget': './src/components/widgets/feedback-widget/feedback-widget',
    './banner_widget': './src/components/widgets/banner-widget/banner-widget',
    './newsroom_widget': './src/components/widgets/newsroom-widget/newsroom-widget',
    './top_menu_widget': './src/components/widgets/top-menu-widget/top-menu-widget',
  },
  remotes = {},
  shared = {
    // ...pkg.dependencies,
    react: { singleton: !0, requiredVersion: pkg.dependencies.react },
    'react-dom': { singleton: !0, requiredVersion: pkg.dependencies['react-dom'] },
    'react-router-dom': { singleton: !0 },
    '@quantumart/qp8-widget-platform-bridge': { singleton: !0 },
  };
module.exports = {
  client: new ModuleFederationPlugin({
    name: 'qp_widgets_platform_modules',
    filename: 'remoteEntry.js',
    exposes,
    remotes,
    shared,
  }),
  server: [
    new NodeFederationPlugin({
      name: 'qp_widgets_platform_modules',
      library: { type: 'commonjs-module' },
      remotes,
      filename: 'remoteEntry.js',
      exposes,
      shared,
    }),
    new StreamingTargetPlugin({
      name: 'qp_widgets_platform_modules',
      library: { type: 'commonjs-module' },
      remotes,
    }),
  ],
};
