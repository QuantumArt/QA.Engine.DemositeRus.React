const path=require("path"),HtmlWebpackPlugin=require("html-webpack-plugin"),baseconfig=require("./webpack.config.client._"),CopyPlugin=require("copy-webpack-plugin"),{merge}=require("webpack-merge"),webpackConfig={plugins:[new HtmlWebpackPlugin({template:path.resolve(__dirname,"../src/client/public/index.html")}),new CopyPlugin({patterns:[{context:"src/client/public",from:"favicon.ico",to:"favicon.ico"},{context:"src/app-settings-shell",from:"settings.json",to:"settings.json"}]})]};module.exports=merge(baseconfig,webpackConfig);