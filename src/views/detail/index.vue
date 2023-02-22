<template>
  <div class="detail">
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ artObj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artObj.aut_name" :label="artObj.pubdate">
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="artObj.is_followed"
              @click="followedFn(false)"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="followedFn(true)"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <div class="end">
        <!-- 点赞 -->
        <div class="like-box">
          <van-button
            icon="good-job"
            type="danger"
            size="small"
            v-if="artObj.attitude == 1"
            @click="loveFn(false)"
            >已点赞</van-button
          >
          <van-button
            icon="good-job-o"
            type="danger"
            plain
            size="small"
            v-else
            @click="loveFn(true)"
            >点赞</van-button
          >
        </div>

        <!-- 收藏 -->
        <div class="collect-box">
          <van-button
            icon="star"
            type="warning"
            size="small"
            plain
            v-if="artObj.is_collected"
            @click="collect(false)"
            >已收藏</van-button
          >
          <van-button
            icon="star-o"
            type="warning"
            plain
            size="small"
            v-else
            @click="collect(true)"
            >收藏</van-button
          >
        </div>
      </div>
    </div>

    <!-- 文章评论区 -->
    <!-- <Comment /> -->
  </div>
</template>

<script>
import {
  getDetail,
  followedUser,
  unFollowedUser,
  articleLike,
  articleDisLike,
  articleCollect,
  unArticleCollect,
} from "@/api/detail";
import "highlight.js/styles/github.css";
export default {
  data() {
    return {
      artObj: {},
    };
  },
  methods: {
    //关注
    async followedFn(flag) {
      if (flag) {
        await followedUser({ target: this.artObj.aut_id });
        this.getData();
      } else {
        await unFollowedUser(this.artObj.aut_id);
        this.getData();
      }
    },
    //点赞
    async loveFn(flag) {
      if (flag) {
        await articleLike({ target: this.artObj.art_id });
        this.getData();
      } else {
        await articleDisLike(this.artObj.art_id);
        this.getData();
      }
    },
    //收藏
    async collect(flag) {
      if (flag) {
        await articleCollect({ target: this.artObj.art_id });
        this.getData();
      } else {
        await unArticleCollect(this.artObj.art_id);
        this.getData();
      }
    },
    //获取数据
    async getData() {
      const id = this.$route.query.aid;
      const { data } = await getDetail(id);
      this.artObj = data;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.end,
.like-box,
.collect-box {
  display: flex;
  justify-content: center;
}
.collect-box {
  margin-left: 20px;
}
/deep/ .van-nav-bar__content {
  background-color: #3196fa;
  .van-icon {
    color: #fff;
  }
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>