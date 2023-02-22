import axios from "@/utils/request";

//根据id获取文章详情
export async function getDetail(id) {
  return await axios.get(`articles/${id}`);
}
//关注
export async function followedUser(data) {
  return await axios.post("user/followings", data);
}

//取消关注
export async function unFollowedUser(id) {
  return await axios.delete(`user/followings/${id}`);
}

//点赞
export async function articleLike(data) {
  return await axios.post("article/likings", data);
}

//取消点赞
export async function articleDisLike(id) {
  return await axios.delete(`article/likings/${id}`);
}

//收藏
export async function articleCollect(data){
  return await axios.post("article/collections",data)
}

//取消收藏
export async function unArticleCollect(id){
  return await axios.delete(`article/collections/${id}`)
}
