<template>
  <div class="layout">
    <!-- 标签栏 -->
    <van-tabbar v-model="active" router>
      <van-tabbar-item icon="home-o" to="/layout/home" name="home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/layout/ask" name="ask"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="video-o" to="/layout/video" name="video"
        >视频</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" to="/layout/mine" name="mine"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
    };
  },
  activated() {
    this.active = location.pathname.split("layout/")[1];
  },
};
</script>

<style>
</style>