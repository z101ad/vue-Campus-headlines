<template>
  <div class="chat">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>

    <!-- 聊天面板区域 -->
    <div class="chat-list" ref="chatList">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小智 -->
        <div v-if="!item.isMe" class="chat-item left">
          <van-image fit="cover" round :src="require('@/assets/robot.jpg')" />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div v-else class="chat-item right">
          <div class="chat-pao my">{{ item.msg }}</div>
          <van-image
            fit="cover"
            round
            :src="$store.state.user.userInfo.photo"
          />
        </div>
      </div>
    </div>

    <div class="reply-container van-hairline--top">
      <van-field v-model="msg" @keyup.enter="send" placeholder="说点什么...">
        <span @click="send" slot="button" style="font-size: 12px; color: #999">
          提交
        </span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { Notify } from "vant";
export default {
  data() {
    return {
      //聊天记录
      list: [],
      //io对象
      socket: null,
      //消息
      msg: "",
    };
  },
  created() {
    this.socket = io("http://geek.itheima.net", {
      query: {
        token: this.$store.state.user.token,
      },
      transports: ["websocket"],
    });
    //监听服务器消息
    this.socket.on("message", (data) => {
      this.list.push({
        isMe: false,
        msg: data.msg,
      });
    });
    this.$nextTick(() => {
      this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
    });
    this.$store.dispatch("user/getInfo");
  },
  methods: {
    send() {
      if (!this.msg.trim())
        return this.$notify({ type: "danger", message: "输入内容不能为空" });
      this.list.push({
        isMe: true,
        msg: this.msg,
      });
      //给服务器发消息
      this.socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now(),
      });
      this.$nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
      });
      this.msg = "";
    },
  },
};
</script>

<style lang="less" scoped>
.chat {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 0 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
      .chat-pao.my {
        background-color: #9eea6a;
        &::before {
          content: "";
          background: #9eea6a;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
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