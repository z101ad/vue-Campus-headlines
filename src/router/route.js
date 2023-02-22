export default [
  {
    path: "/",
    redirect: "/layout/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/channel",
    name: "channel",
    component: () => import("@/views/channel"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/views/detail"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search"),
  },
  {
    path: "/searchResults",
    name: "searchResults",
    component: () => import("@/views/search/searchResults.vue"),
  },
  {
    path: "/mine/edit",
    name: "edit",
    component: () => import("@/views/mine/editInfo.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat"),
  },
  {
    path: "/layout",
    name: "layout",
    redirect: "/layout/home",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "ask",
        name: "ask",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "mine",
        name: "mine",
        component: () => import("@/views/mine"),
      },
    ],
  },
];
