import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Dashboard from "@/views/Dashboard.vue";
import Teachers from "@/views/Teachers.vue";
import Students from "@/views/Students.vue";
import Subjects from "@/views/Subjects.vue";
import Classes from "@/views/Classes.vue";
import Login from "@/views/Login.vue";
import ClassType from "@/views/ClassType.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: Login, meta: { public: true } },
    { path: "/", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/teachers", component: Teachers, meta: { requiresAuth: true } },
    { path: "/students", component: Students, meta: { requiresAuth: true } },
    { path: "/subjects", component: Subjects, meta: { requiresAuth: true } },
    { path: "/classes", component: Classes, meta: { requiresAuth: true } },
    { path: "/class-type", component: ClassType, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to) => {
  // auth store must be accessed inside the guard (after pinia is active)
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: "/login" };
  }

  if (to.path === "/login" && auth.isAuthenticated) {
    return { path: "/" };
  }
});

export default router;
