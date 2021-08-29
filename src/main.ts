import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Particles from "particles.vue3";
import AntDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App)
    .use(AntDesign)
    .use(Particles)
    .use(router)
    .mount("#app");
