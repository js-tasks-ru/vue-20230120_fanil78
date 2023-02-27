import { createRouter, createWebHistory } from "vue-router";

import PageIndex from "../views/PageIndex";
import PageLogin from "../views/PageLogin";
import PageRegister from "../views/PageRegister";

export const router = createRouter({
  history: createWebHistory("/05-vue-router/01-AuthPages"),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: PageIndex,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: PageLogin,
    },
    {
      path: "/register",
      name: "RegisterPage",
      component: PageRegister,
    },
  ],
});
