import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./route.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path === "/login") {
    const token = sessionStorage.getItem("token") || "";
    if (token) return next("/");
    next();
  } else {
    const token = sessionStorage.getItem("token") || "";
    if (!token) return next("/login");
    next();
  }
});

export default router;
