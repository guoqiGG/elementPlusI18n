import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  ease: "ease",
  speed: 500,
});
const routes = [
  {
    path: "/",
    redirect: "index",
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue"),
    meta: {
      requiresAuth: true,
      name: "首页",
      title: "首页 - vue admin system",
    },
  },
  {
    path: "/age",
    name: "age",
    component: () => import("../views/age.vue"),
    meta: {
      requiresAuth: true,
      name: "年龄",
      title: "年龄 - vue admin system",
    },
  },
  {
    path: "/name",
    name: "name",
    component: () => import("../views/name.vue"),
    meta: {
      requiresAuth: true,
      name: "姓名",
      title: "姓名 - vue admin system",
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


// 路由守卫
router.beforeEach((to, from, next) => {
  next()
  NProgress.start();
});

router.afterEach((to) => {
  NProgress.done();
  // 根据路由名称设置标题
  document.title = to.meta.title
});

export default router
