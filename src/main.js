import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate'

//To jest Demo applikacji do wydrukowania nakleek
//Это Демо-версия приложение для печати наклеек
//This is a Demo App for sticker printing
Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
