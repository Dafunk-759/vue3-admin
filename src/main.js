import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import common from "./plugin/index.js";

createApp(App).use(router).use(common).mount("#app");
