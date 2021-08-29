import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteComponents, {AntDesignVueResolver} from "vite-plugin-components";
import Banner from "vite-plugin-banner";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/mirage-tank-images/",
    plugins: [
        vue(),
        ViteComponents({
            customComponentResolvers: [ AntDesignVueResolver() ],
        }),
        Banner("MIT License - Copyright (c) 2021 Samarium")
    ],
    build: {
        commonjsOptions: {
            extensions: [".js", ".d.ts"]
        },
        chunkSizeWarningLimit: 1000
    }
});
