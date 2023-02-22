<template>
  <div class="searchResults" ref="searchResults" @scroll="onScroll">
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
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
import ArticleItem from "@/components/articleItem.vue";
import { getSearchResults } from "@/api/search";
import getList from "@/mixins/list";
export default {
  mixins: [getList("searchResults")],
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [],
      params: {
        q: "",
        page: 1,
        per_page: 10,
      },
    };
  },
  methods: {
    //获取数据
    async getData() {
      this.loading = true;
      const res = await getSearchResults(this.params);
      this.list = [...this.list, ...res.data.results];
      if (this.params.page * this.params.per_page > res.data.total_count) {
        this.finished = true;
      }
      this.params.page++;
      this.loading = false;
    },
  },
  created() {
    this.params.q = this.$route.query.q;
  },
};
</script>

<style scoped lang="less">
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