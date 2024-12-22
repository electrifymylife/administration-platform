import { createRouter, createWebHistory } from 'vue-router'
import GlobalMenuPage from "../modules/main/GlobalMenuPage.vue";
import coursesRoutes from "../modules/edu/courses/router";
const baseRoutes = [
  {
    path: '/',
    component: GlobalMenuPage
  },
];
const routes = baseRoutes.concat(
  coursesRoutes,
);
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

export default router
