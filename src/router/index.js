import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddInfo from "../views/AddInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Home
  },
  {
    path: "/addInfo",
    name: "AddInfo",
    component: AddInfo
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
