<template>
  <div class="channel">
    <!-- 导航栏 -->
    <van-nav-bar title="频道管理" left-text="返回" @click-left="onClickLeft" />
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <template #right-icon>
        <van-button
          plain
          type="info"
          size="mini"
          hairline
          @click="handleClick"
          >{{ !flag ? "编辑" : "取消" }}</van-button
        >
      </template>
    </van-cell>
    <!-- 我的频道-内容 -->
    <van-grid>
      <van-grid-item
        v-for="item in userChannels"
        :key="item.id"
        @click="gotoChannel(item.id)"
        :style="{ color: active === item.id ? 'red' : '#323233' }"
        >{{ item.name
        }}<van-icon
          v-if="item.id !== 0 && flag"
          name="clear"
          color="red"
          size="20"
          @click="delUserChannel(item.id)"
      /></van-grid-item>
    </van-grid>
    <!-- 可选频道 -->
    <van-cell title="可选频道" class="optional" />
    <!-- 可选频道-内容 -->
    <van-grid>
      <van-grid-item
        v-for="item in optionalChannels"
        :text="item.name"
        :key="item.id"
        @click="addUserChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //按钮变化标识 编辑：false  取消:true
      flag: false,
      //所有频道数据
      channels: [],
      //我的频道数据
      userChannels: [],
      //当前频道
      active: 0,
    };
  },
  methods: {
    //进入或退出编辑状态
    handleClick() {
      this.flag = !this.flag;
    },
    // 获取频道数据
    async getData() {
      await this.$store.dispatch("channel/getUserData");
      this.userChannels = this.$store.state.channel.userChannels;
      this.active = this.$store.state.channel.active;
      await this.$store.dispatch("channel/getData");
      this.channels = this.$store.state.channel.channels;
    },
    //返回首页
    onClickLeft() {
      this.$router.push("/layout/home");
    },
    //添加频道
    async addUserChannel(item) {
      this.userChannels.push(item);
      const data = this.userChannels.map((item, i) => {
        return {
          id: item.id,
          seq: i,
        };
      });
      await this.$store.dispatch("channel/addUserData", { channels: data });
      this.getData();
    },
    //删除频道
    async delUserChannel(id) {
      this.userChannels = this.userChannels.filter((item) => item.id !== id);
      const data = this.userChannels.map((item, i) => {
        return {
          id: item.id,
          seq: i,
        };
      });
      await this.$store.dispatch("channel/addUserData", { channels: data });
      if (id === this.active) {
        this.$store.commit("channel/setActive", 0);
      }
      this.getData();
    },
    //进入频道
    gotoChannel(id) {
      if (this.flag) return;
      this.$store.commit("channel/setActive", id);
      this.$router.push("/layout/home");
    },
  },
  computed: {
    //可选频道数据
    optionalChannels() {
      const userIndex = this.userChannels.map((item) => item.id);
      return this.channels.filter((item) => !userIndex.includes(item.id));
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.van-button {
  width: 13.33334vw;
}
.van-grid-item {
  position: relative;
  color: #323233;
  font-size: 3.73333vw;
  .van-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
.optional {
  .van-grid-item {
    color: #646566;
    font-size: 3.73333vw;
  }
}
</style>