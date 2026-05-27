import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "@/router";
import ApiService from "@/core/services/ApiService";
import "@/assets/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Antd);

ApiService.init(app, router);

app.mount("#app");
