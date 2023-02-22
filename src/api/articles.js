import axios from "@/utils/request";
//根据id获取文章
export async function getArticles(params) {
  return await axios.get(`articles`, { params });
}

//不感兴趣
export async function articleDislike(data) {
  return await axios.post("article/dislikes", data);
}

//举报
export async function articleReport(data) {
  return await axios.post("article/reports", data);
}

//获取收藏列表
export async function getCollect(params) {
  return await axios.get("article/collections", { params });
}

//获取阅读历史
export async function getHistory(params) {
  return await axios.get("user/histories", { params });
}
