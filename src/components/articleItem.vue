<template>
  <div class="articleItem">
    <van-cell
      v-for="item in list"
      :key="item.art_id + getNum()"
      @click="handleClick(item.art_id)"
    >
      <div>
        <div class="title">{{ item.title }}</div>
        <van-grid :border="false" :column-num="item.cover.type">
          <van-grid-item v-for="(pic, index) in item.cover.images" :key="index">
            <van-image :src="pic" />
          </van-grid-item>
        </van-grid>
        <div class="info-box">
          <div>
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ $relvTime(item.pubdate) }}</span>
          </div>
          <van-icon name="cross" @click="open($event, item)" v-if="!icon" />
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    //打开反馈框
    open(e, item) {
      e.stopPropagation();
      this.$emit("clickIcon", item);
    },
    //跳转详情页
    handleClick(id) {
      this.$router.push(`/detail?aid=${id}`);
    },
    //随机数字
    getNum() {
      return Math.random().toString(32).slice(-6);
    },
  },
};
</script>

<style scoped lang="less">
.info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
    color: gray;
    &:nth-child(2) {
      margin: 0 15px;
    }
  }
}
</style>