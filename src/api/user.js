import axios from "@/utils/request";

//登录注册
export async function login(form) {
  return await axios.post("authorizations", form);
}

//刷新
export async function reload(refresh_token) {
  return await axios({
    url: "authorizations",
    method: "put",
    headers: {
      Authorization: "Bearer " + refresh_token || "",
    },
  });
}

//获取用户信息
export async function getUserInfo() {
  return await axios.get("user/profile");
}

// 编辑用户信息
export async function patchUserInfo(data) {
  return await axios.patch("user/profile", data);
}

//编辑用户照片
export async function patchUserPhoto(data) {
  return await axios.patch("user/photo", data);
}

//获取验证码
export async function getUserCode(mobile) {
  return await axios.get(`sms/codes/${mobile}`);
}
