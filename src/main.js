import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//vant配置
import "@/utils/vant";

// 导入dayjs
import dayjs from "dayjs";
// 导入相对时间插件
import relativeTime from "dayjs/plugin/relativeTime";
// 导入中文语言包
import "dayjs/locale/zh-cn";
// 让dayjs运用插件
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

// 移动端适配
import 'amfe-flexible'

import "@/assets/font/iconfont.css";

Vue.prototype.$relvTime = function (time) {
  return dayjs(time).fromNow();
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
