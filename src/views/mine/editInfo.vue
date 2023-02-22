<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />
    <!-- 头像区域 -->
    <div class="avatar-box">
      <van-image :src="userInfo.photo" round fit="cover"></van-image>
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 资料区域 -->
    <van-cell-group>
      <van-cell
        @click="clickNameCell"
        title="名称"
        :value="userInfo.name"
        is-link
      />
      <van-cell
        @click="clickGenderCell"
        title="性别"
        :value="userInfo.gender ? '男' : '女'"
        is-link
      />
      <van-cell
        @click="clickBirthCell"
        title="生日"
        :value="userInfo.birthday"
        is-link
      />
    </van-cell-group>

    <!-- 图片裁剪区域 -->
    <div v-if="cropShow" class="crop-box">
      <vueCropper
        ref="cropper"
        :img="cropImg"
        autoCrop
        autoCropWidth="200"
        autoCropHeight="200"
      ></vueCropper>

      <van-button type="primary" @click="doCrop">裁剪</van-button>
      <van-button type="primary" @click="cropShow = false">取消</van-button>
    </div>

    <!-- 弹出框区域 -->
    <van-dialog
      @confirm="changeName"
      v-model="nameShow"
      title="标题"
      show-cancel-button
    >
      <input
        ref="inp"
        v-model.trim="nameValue"
        class="name-input"
        type="text"
      />
    </van-dialog>

    <!-- 生日弹出层 -->
    <van-popup v-model="birthShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        @cancel="birthShow = false"
        @confirm="changeBirth"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <!-- 性别修改弹出层 -->
    <van-popup
      class="gender"
      v-model="genderShow"
      position="bottom"
      :style="{ height: '22%' }"
    >
      <van-nav-bar
        title="修改性别"
        left-text="取消"
        @click-left="genderShow = false"
      />
      <van-cell is-link title="男" @click="changeGender(1)" />
      <van-cell is-link title="女" @click="changeGender(0)" />
    </van-popup>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import dayjs from "dayjs";
export default {
  components: {
    VueCropper,
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  data() {
    return {
      //显示图片裁剪区域
      cropShow: false,
      //照片选择数据
      cropImg: "",
      //姓名修改框
      nameShow: false,
      //姓名选择数据
      nameValue: "",
      //生日弹出框标识
      birthShow: false,
      //最小年份
      minDate: new Date(1949, 0, 1),
      //最大年份
      maxDate: new Date(),
      //当前时间
      currentDate: new Date(2021, 0, 17),
      //性别弹出框标识
      genderShow: false,
    };
  },
  async created() {
    await this.$store.dispatch("user/getInfo");
  },
  methods: {
    // 选择完文件调用
    afterRead(file) {
      this.cropImg = file.content;
      this.cropShow = true;
    },
    // 裁剪的点击事件
    doCrop() {
      // 获取裁剪后的图片，得到的是一个图片对象
      this.$refs.cropper.getCropBlob(async (data) => {
        const fm = new FormData();
        fm.append("photo", data);
        await this.$store.dispatch("user/patchPhoto", fm);
        await this.$store.dispatch("user/getInfo");
        this.cropShow = false;
      });
    },
    // 点击名字cell触发的事件
    clickNameCell() {
      this.nameShow = true;
      this.nameValue = this.userInfo.name;
    },
    async changeName() {
      this.userInfo.name = this.nameValue;
      await this.$store.dispatch("user/patchInfo", this.userInfo);
      await this.$store.dispatch("user/getInfo");
      this.nameShow = false;
    },

    // 点击生日cell
    clickBirthCell() {
      this.birthShow = true;
      this.currentDate = new Date(this.userInfo.birthday);
    },

    // 修改生日
    async changeBirth() {
      this.userInfo.birthday = dayjs(this.currentDate).format("YYYY-MM-DD");
      await this.$store.dispatch("user/patchInfo", this.userInfo);
      await this.$store.dispatch("user/getInfo");
      this.birthShow = false;
    },

    // 点击性别cell
    clickGenderCell() {
      // 1.显示性别弹框
      this.genderShow = true;
    },
    async changeGender(gender) {
      this.userInfo.gender = gender;
      await this.$store.dispatch("user/patchInfo", this.userInfo);
      await this.$store.dispatch("user/getInfo");
      this.genderShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
@height: 140px;
.avatar-box {
  height: @height;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-image {
    width: 120px;
    height: 120px;
  }
  .van-uploader {
    position: absolute;
    left: 0;
    top: 0;
    /deep/ .van-uploader__upload {
      width: 100vw;
      height: @height;
      opacity: 0;
    }
  }
}
.crop-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  .van-button {
    position: absolute;
    bottom: 0;

    &:nth-of-type(1) {
      left: 0;
    }
    &:nth-of-type(2) {
      right: 0;
    }
  }
}

.name-input {
  height: 40px;
  width: 100%;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
  border-left: none;
}

.gender {
  /deep/ .van-nav-bar__text {
    color: #fff;
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