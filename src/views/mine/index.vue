<template>
  <div class="mine">
    <!-- 资料区域 -->
    <!-- 资料区域 -->
    <div class="profile-box">
      <!-- 我们适配用了一个插件pxtovw -->
      <!-- 但是它只能转css写的样式，你写的行内属性、行内样式没法转 -->
      <van-image fit="cover" round :src="userInfo.photo" />

      <div class="info-box">
        <h4>{{ userInfo.name }}</h4>
        <span>{{ userInfo.birthday }}</span>
      </div>
    </div>

    <!-- 快捷工具 -->
    <van-grid :column-num="3" :border="false">
      <van-grid-item
        icon="newspaper-o"
        text="我的作品"
        @click="handleClick(0)"
      />
      <van-grid-item icon="star-o" text="我的收藏" @click="handleClick(1)" />
      <van-grid-item icon="tosend" text="阅读历史" @click="handleClick(2)" />
    </van-grid>

    <!-- 功能列表 -->
    <van-cell to="/mine/edit" title="编辑资料" icon="edit" is-link />
    <van-cell to="/chat" title="小智同学" icon="chat-o" is-link />
    <van-cell @click="logout" title="退出登录" icon="info-o" is-link />

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      @closed="close"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
      >
        <van-nav-bar :title="title" />

        <ArticleItem :list="list" :icon="true" />
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import ArticleItem from "@/components/articleItem.vue";
import { getCollect, getHistory } from "@/api/articles";
export default {
  components: {
    ArticleItem,
  },
  data() {
    return {
      //用户数据
      userInfo: {},
      //弹出层标识
      show: false,
      title: "",
      //当前弹出框列表标识
      type: -1,
      //完成标识
      finished: false,
      //加载标识
      loading: false,
      //当前列表数据
      list: [],
      //请求参数
      params: {
        page: 1,
        per_page: 10,
      },
    };
  },
  methods: {
    //获取数据
    getData() {
      if (this.type === 0) {
        this.title = "我的作品";
        this.getList(getCollect);
      } else if (this.type === 1) {
        this.title = "我的收藏";
        this.getList(getCollect);
      } else if (this.type === 2) {
        this.title = "阅读历史";
        this.getList(getHistory);
      }
    },
    async getList(fn) {
      this.loading = true;
      const res = await fn(this.params);
      this.list = [...this.list, ...res.data.results];
      if (this.params.page * this.params.per_page > res.data.total_count) {
        this.finished = true;
      }
      this.params.page++;
      this.loading = false;
    },
    //退出
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.replace("/login");
    },
    //点击展示列表
    handleClick(i) {
      this.show = true;
      this.type = i;
      this.getData();
    },
    //关闭
    close() {
      this.show = false;
      this.finished = false;
      this.loading = false;
      this.params.page = 1;
      this.list = [];
    },
  },
  async created() {
    await this.$store.dispatch("user/getInfo");
    this.userInfo = this.$store.state.user.userInfo;
  },
  activated() {
    this.getData();
  },
};
</script>

<style scoped lang="less">
.mine {
  @color: #3296fa;
  .profile-box {
    height: 140px;
    background-color: @color;
    display: flex;
    align-items: center;

    .van-image {
      width: 100px;
      height: 100px;
      margin: 0 10px 0 20px;
    }

    .info-box {
      h4 {
        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
      }
      span {
        background-color: #fff;
        color: @color;
        font-size: 16px;
        padding: 3px 2px;
      }
    }
  }
  .van-grid {
    /deep/ .van-icon {
      font-size: 30px;
    }
    /deep/ .van-icon-newspaper-o {
      color: @color;
    }
    /deep/ .van-icon-star-o {
      color: #f00;
    }
    /deep/ .van-icon-tosend {
      color: orange;
    }
  }
}
</style>