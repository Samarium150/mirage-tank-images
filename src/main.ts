import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Particles from "particles.vue3";

createApp(App)
    .use(Particles)
    .use(router)
    .mount("#app");
