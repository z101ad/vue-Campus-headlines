//设置token
export function setItem(token) {
  sessionStorage.setItem("token", token);
}
//获取token
export function getItem() {
  return sessionStorage.getItem("token");
}

//删除token
export function removeItem() {
  return sessionStorage.removeItem("token");
}
