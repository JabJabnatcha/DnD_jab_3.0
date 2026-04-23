import { createRouter, createWebHistory } from "vue-router";

// lazy load (best practice)
const HomeView = () => import("../views/Homeview.vue");
const CreateCharacterView = () => import("../views/CreateCharacter.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create",
      name: "create-character",
      component: CreateCharacterView,
    },
  ],
});

export default router;