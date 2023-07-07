const path=require("path"),moduleFederationPlugin=require("./module-federation"),baseconfig=require("./webpack.config._"),nodeExternals=require("webpack-node-externals"),{merge}=require("webpack-merge"),webpackConfig={entry:path.resolve(__dirname,"../src/client/index"),mode:"production",target:"node",output:{path:path.resolve(__dirname,"../dist/static/server"),chunkFilename:"[name].[contenthash].js",filename:"main.[contenthash].js"},externalsType:"node-commonjs",plugins:[...moduleFederationPlugin.server]};module.exports=merge(baseconfig,webpackConfig);