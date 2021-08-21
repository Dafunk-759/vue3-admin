import { createRouter, createWebHashHistory } from "vue-router";

import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import NotFound from "../components/NotFound.vue";

import HomeDashWelcome from "../components/HomeDashWelcome.vue";
import HomeDashUsers from "../components/HomeDashUsers.vue";
import HomeDashRoles from "../components/HomeDashRoles.vue";
import HomeDashRights from "../components/HomeDashRights.vue";
import HomeDashGoods from "../components/HomeDashGoods.vue";
import HomeDashCate from "../components/HomeDashCate.vue";
import HomeDashParam from "../components/HomeDashParam.vue";
import HomeDashGoodsAdd from "../components/HomeDashGoodsAdd.vue";
import HomeDashOrder from "../components/HomeDashOrder.vue";

const homeRoutes = [
  {
    path: "welcome",
    name: "welcome",
    component: HomeDashWelcome,
  },
  {
    path: "users",
    name: "users",
    component: HomeDashUsers,
  },
  {
    path: "roles",
    name: "roles",
    component: HomeDashRoles,
  },
  {
    path: "rights",
    name: "rights",
    component: HomeDashRights,
  },
  {
    path: "goods",
    name: "goods",
    component: HomeDashGoods,
  },
  {
    path: "goods/add",
    name: "goodsAdd",
    component: HomeDashGoodsAdd,
  },
  {
    path: "categories",
    name: "categories",
    component: HomeDashCate,
  },
  {
    path: "params",
    name: "params",
    component: HomeDashParam,
  },
  {
    path: "orders",
    name: "orders",
    component: HomeDashOrder,
  },
];

const routes = [
  { path: "/login", name: "login", component: Login },
  {
    path: "/home",
    redirect: "/home/welcome",
    name: "home",
    component: Home,
    children: homeRoutes,
  },
  { path: "/", redirect: "/login" },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") return next();
  const token = sessionStorage.getItem("token");
  if (!token) return next("/login");
  next();
});

export default router;
