import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/products/create",
    name: "product-create",
    component: () => import("@/views/products/Create.vue"),
  },
  {
    path: "/products/index",
    name: "product-index",
    component: () => import("@/views/products/Index.vue"),
  },
  {
    path: "/products/:id",
    name: "product-id",
    component: () => import("@/views/products/Product.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
