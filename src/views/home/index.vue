<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-image :src="imgUrl" />
      </template>
      <template #right>
        <van-button
          round
          type="info"
          icon="search"
          size="small"
          @click="intoSearch"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 标签页 -->
    <div class="tab">
      <van-tabs v-model="active" swipeable sticky @change="changeActive">
        <van-tab
          v-for="item in channels"
          :title="item.name"
          :key="item.id"
          :name="item.id"
        >
          <Article :id="active" />
        </van-tab>
        <div class="icon-box">
          <van-icon class="bars" name="wap-nav" @click="cannelClick" />
        </div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/logo.png";
import Article from "./Article.vue";

export default {
  components: {
    Article,
  },
  data() {
    return {
      //logo地址
      imgUrl,
      //所有频道数据
      channels: [],
      //频道标识
      active: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取用户频道
    async getData() {
      await this.$store.dispatch("channel/getUserData");
      this.channels = this.$store.state.channel.userChannels;
      this.active = this.$store.state.channel.active;
    },
    //选择频道
    cannelClick() {
      this.$router.push(`/channel`);
    },
    //改变active
    changeActive(id) {
      this.$store.commit("channel/setActive", id);
    },
    //跳转搜索页
    intoSearch() {
      this.$router.push(`/search`);
    },
  },
};
</script>

<style scoped lang="less">
.home {
  .van-image {
    width: 33.6vw;
    img {
      object-fit: contain;
    }
  }
  .van-button {
    width: 30.66667vw;
    background-color: #5aabfb;
    font-size: 3.77773vw;
    border: 0;
    i::before {
      color: #fff;
    }
  }
  .tab {
    position: relative;
    .van-tabs {
      /deep/ .van-tab {
        position: relative;
        min-width: 16vw;
        padding: 0 1.06667vw;
      }
      /deep/ .van-sticky {
        background-color: #fff;
      }
      /deep/ .van-tabs__wrap {
        margin-right: 8vw;
      }
    }
    .icon-box {
      position: absolute;
      right: 1vw;
      top: 3vw;
      background-color: #fff;
      .van-icon {
        font-size: 5.33334vw;
      }
    }
  }

  /deep/ .van-nav-bar__content {
    background-color: #3196fa;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
</style>