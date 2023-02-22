import axios from "@/utils/request";
//获取所有频道
export async function getChannels() {
  return await axios.get("channels");
}

//获取用户的频道
export async function getUserChannels() {
  return await axios.get("user/channels");
}

//删除指定用户频道
// export async function deleteUserChannel(id) {
//   return await axios.delete(`user/channels/${id}`);
// }

//添加或删除指定用户频道
export async function putUserChannel(data) {
  return await axios.put(`user/channels`, data);
}
