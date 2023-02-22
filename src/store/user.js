import { login, getUserInfo, patchUserInfo, patchUserPhoto } from "@/api/user";
import { Notify } from "vant";
import { setItem, removeItem } from "@/utils/storage";
export default {
  namespaced: true,
  state: {
    loading: false,
    token: sessionStorage.getItem("token") || "",
    refresh_token: "",
    userInfo: {},
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val;
    },
    setToken(state, val) {
      state.token = val;
      setItem(val);
    },
    setRefToken(state, val) {
      state.refresh_token = val;
    },
    setUserInfo(state, val) {
      state.userInfo = val;
    },
  },
  actions: {
    //login
    async loginUser(ctx, form) {
      ctx.commit("setLoading", true);
      const { data } = await login(form);
      if (data) {
        ctx.commit("setToken", data.token);
        ctx.commit("setRefToken", data.refresh_token);
        Notify({
          type: "success",
          message: "登录成功",
        });
      } else {
        Notify({
          type: "error",
          message: "登录失败",
        });
      }
      ctx.commit("setLoading", false);
      return data;
    },
    //退出
    async logout(ctx) {
      ctx.commit("setToken", "");
      ctx.commit("setRefToken", "");
      ctx.commit("setUserInfo", {});
      removeItem();
    },
    //获取用户信息
    async getInfo(ctx) {
      const { data } = await getUserInfo();
      ctx.commit("setUserInfo", data);
    },
    //编辑用户信息
    async patchInfo(ctx, data) {
      await patchUserInfo(data);
    },
    //编辑用户照片
    async patchPhoto(ctx, data) {
      await patchUserPhoto(data);
    },
  },
};
