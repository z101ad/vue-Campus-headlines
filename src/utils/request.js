import axios from "axios";
import NProgress from "nprogress";
import { reload } from "@/api/user";
import store from "@/store";
import { Notify } from "vant";
import router from "@/router";
const ins = axios.create({
  baseURL: "http://geek.itheima.net/v1_0/",
});

//请求拦截
ins.interceptors.request.use(
  (config) => {
    NProgress.start();
    if (config) {
      config.headers.Authorization =
        "Bearer " + sessionStorage.getItem("token") || "";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//响应拦截
ins.interceptors.response.use(
  (res) => {
    NProgress.done();
    return res.data;
  },
  async (err) => {
    if (err.response.status === 401) {
      try {
        const { data } = await reload(store.state.user.refresh_token);
        store.commit("setToken", data.token);
        //重新请求
        return ins(err.config);
      } catch (error) {
        //退出登录
        store.dispatch("user/layout");
        //弹出提示
        Notify({
          type: "warning",
          message: "登录过期，请重新登录",
        });
        router.replace("/login");
        return {};
      }
    }
    return Promise.reject(err);
  }
);

export default ins;
