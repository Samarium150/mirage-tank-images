const webpack = require("webpack");

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/mirage-tank-images/" : "/",
    chainWebpack: (config) => {
        config
            .module
            .rule("raw")
            .resourceQuery(/raw/)
            .type("asset/source");
        config
            .plugin("html")
            .tap((args) => {
                args[0].title = "\"幻影坦克\"图片生成器";
                return args;
            });
        config
            .plugin("banner")
            .use(webpack.BannerPlugin, ["MIT License - Copyright (c) 2021 Samarium"])
    }
};
