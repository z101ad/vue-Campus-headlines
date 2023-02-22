<template>
  <div class="search">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />

    <!-- 搜索框要进行防抖 -->
    <van-search
      v-model.trim="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @input="fn"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!-- 联想词 -->
    <van-cell-group v-if="value">
      <van-cell v-for="(item, index) in colorList" :key="index" icon="search">
        <div v-html="item" @click="fn2(suggestList[index])"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录"></van-cell>
      <van-cell v-for="(item, index) in historyList" :key="index">
        <div v-html="item" @click="fn2(item)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggest } from "@/api/search";
export default {
  data() {
    return {
      //搜索内容
      value: "",
      //联想词数据
      suggestList: [],
      //历史搜索记录
      historyList: [],
      //防抖
      timer: null,
    };
  },
  methods: {
    //搜索
    async onSearch() {
      this.$router.push(`/searchResults?q=${this.value}`);
      this.historyList = [this.value, ...this.historyList];
      localStorage.setItem("history", JSON.stringify(this.historyList));
    },
    //获取联想建议
    fn() {
      // if (!this.value) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        if (!this.value) return;
        const res = await getSuggest({ q: this.value });
        this.suggestList = res.data.options;
      }, 1000);
    },
    //根据关键字搜索
    fn2(val) {
      this.value = val;
      this.onSearch();
    },
  },
  computed: {
    colorList() {
      if (!this.suggestList[0]) return [];
      return this.suggestList.map((v) => {
        return v.replaceAll(
          this.value,
          `<span style="color:red;">${this.value}</span>`
        );
      });
    },
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem("history"));
  },
  activated() {
    this.value = "";
  },
};
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
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