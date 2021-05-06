import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter: (to, from, next) => {
      // make request to server to check JWT in cookies
      axios
        .post(`${process.env.VUE_APP_SERVER_ENDPOINT}/auth/profile`, null, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          next();
        })
        .catch(() => {
          // if either no token, token is expire or token is modified then push guest back to deshboard
          next({ path: "/" });
        });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
