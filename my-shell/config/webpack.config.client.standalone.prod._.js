const shared=require("./webpack.config.client.standalone._"),{EnvironmentPlugin}=require("webpack"),{merge}=require("webpack-merge"),webpackConfig={plugins:[new EnvironmentPlugin({wpPlatform:{publicPath:"/"}})]};module.exports=merge(shared,webpackConfig);