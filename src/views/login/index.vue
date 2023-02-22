<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <!-- v-model：双向绑定  -->
      <!-- label：设置输入框左侧文字 -->
      <van-field
        v-model="loginForm.mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="loginForm.code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #button>
          <van-button size="small" type="info" @click="getCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          :loading="loading"
          loading-text="加载中..."
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getUserCode } from "@/api/user";
export default {
  data() {
    return {
      //加载标识
      loading: false,
      //登录表单
      loginForm: {
        mobile: "13122225555",
        code: "246810",
      },
      //表单验证规则
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号码",
          },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位验证码",
          },
        ],
      },
    };
  },
  created() {
    this.loading = this.$store.state.user.loading;
  },
  methods: {
    //提交表单
    async onSubmit() {
      const res = await this.$store.dispatch("user/loginUser", this.loginForm);
      if (res) {
        this.$router.replace("/");
      }
    },
    //获取验证码
    async getCode() {
      await getUserCode(this.loginForm.mobile);
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__content {
  background-color: #3196fa;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>