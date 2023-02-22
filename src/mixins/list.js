import { firstActions, secondActions } from "@/utils/action";
import { Notify } from "vant";
import { articleDislike, articleReport } from "@/api/articles";

export default function (dom) {
  return {
    data() {
      return {
        loading: false,
        finished: false,
        refreshing: false,
        //时间戳
        timestamp: new Date(),
        //滚动距离
        scrollTop: 0,
        //滚动防抖
        timer: null,
        //反馈标识
        show: false,
        //反馈框数据
        actions: firstActions,
        mytext: "取消",
        //当前文章
        article: {},
      };
    },
    methods: {
      //滚动触发
      onScroll() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.scrollTop = this.$refs[dom].scrollTop;
        }, 100);
      },
      onRefresh() {
        // 清空列表数据
        this.list = [];
        dom === "artList" && (this.timestamp = new Date());
        this.refreshing = true;
        // 重新加载数据
        this.getData();
        this.refreshing = false;
      },
      //选择反馈框
      async onSelect(val) {
        if (val.name === "反馈垃圾内容") {
          this.actions = secondActions;
          this.mytext = "返回";
        } else if (val.name === "不感兴趣") {
          try {
            await articleDislike({ target: this.article.art_id });
            this.list = this.list.filter(
              (item) => item.art_id !== this.article.art_id
            );
            Notify({ type: "success", message: "反馈成功" });
          } catch (error) {
            Notify({ type: "warning", message: "反馈失败-联系程序员" });
          }
          this.show = false;
        } else {
          try {
            await articleReport({
              target: this.article.art_id,
              type: val.name,
              remark: "就是其他问题",
            });
            this.list = this.list.filter(
              (item) => item.art_id !== this.article.art_id
            );
            Notify({ type: "success", message: "反馈成功" });
          } catch (error) {
            Notify({ type: "warning", message: "反馈失败-联系程序员" });
          }
          this.show = false;
        }
      },
      //关闭反馈框
      onCancel() {
        if (this.mytext === "返回") {
          this.show = true;
          this.actions = firstActions;
          this.mytext = "取消";
          return;
        }
        this.show = false;
      },
      //打开反馈框
      clearItem(row) {
        this.article = row;
        this.show = true;
      },
    },
    activated() {
      this.$refs[dom].scrollTop = this.scrollTop;
    },
    BeforeDestroy() {
      this.$refs[dom].removeEventListener("scroll", this.onScroll);
      clearTimeout(this.timer);
    },
  };
}
