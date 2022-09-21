import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./api/index";
import "../src/assets/style/base.scss";
import VueAnimateNumber from "vue-animate-number";
import "element-ui/lib/theme-chalk/index.css";
import element from "./utils/element.js";
Vue.use(element);
Vue.prototype.$api = http;
Vue.use(VueAnimateNumber);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
