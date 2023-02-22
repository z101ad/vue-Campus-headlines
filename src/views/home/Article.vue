<template>
  <div class="article-list" ref="artList" @scroll="onScroll">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
      >
        <ArticleItem :list="list" @clickIcon="clearItem" />
      </van-list>
    </van-pull-refresh>
    <!-- 反馈面板 -->
    <!-- 注意，这里如果不更改挂载点，会无法显示 -->
    <!-- 因为父级元素有ovreflow：hidden，子元素超出父元素，所以隐藏了，所以要更改挂载元素 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="mytext"
      @select="onSelect"
      @cancel="onCancel"
      get-container="body"
    />
  </div>
</template>

<script>
import { getArticles } from "@/api/articles";
import ArticleItem from "@/components/articleItem.vue";
import getList from "@/mixins/list";
export default {
  mixins: [getList("artList")],
  components: {
    ArticleItem,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    //获取数据
    async getData() {
      this.loading = true;
      const res = await getArticles({
        channel_id: this.id,
        timestamp: this.timestamp,
      });
      this.list = [...this.list, ...res.data.results];
      this.timestamp = res.data.pre_timestamp;
      if (!this.timestamp) {
        this.finished = true;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  overflow: auto;
  top: 90px;
  bottom: 50px;
  width: 100vw;
}
</style>