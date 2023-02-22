import {
  getChannels,
  getUserChannels,
  putUserChannel,
} from "@/api/channel";
export default {
  namespaced: true,
  state: {
    //当前频道
    active: 0,
    //我的频道
    userChannels: [],
    //所有频道
    channels: [],
  },
  mutations: {
    setActive(state, val) {
      state.active = val;
    },
    setChannels(state, val) {
      state.channels = val;
    },
    setUserChannels(state, val) {
      state.userChannels = val;
    },
  },
  actions: {
    //获取所有频道
    async getData(ctx) {
      const { data } = await getChannels();
      if (data) {
        ctx.commit("setChannels", data.channels);
      }
    },
    //获取用户频道
    async getUserData(ctx) {
      const { data } = await getUserChannels();
      if (data) {
        ctx.commit("setUserChannels", data.channels);
      }
    },
    //添加用户频道
    async addUserData(ctx, val) {
      const { data } = await putUserChannel(val);
      if (data) {
        ctx.commit("setUserChannels", data.channels);
      }
    },
  },
};
