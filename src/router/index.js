import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import { getToken } from '../util/auth';

const Profile = () => import('../views/Profile.vue');
const Create = () => import('../views/Create.vue');
const Search = () => import('../views/Search.vue');
const Item = () => import('../views/Item.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { needAuth: true }
    },
    {
      path: "/create",
      name: "create",
      component: Create,
      meta: { needAuth: true }
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/item/:id",
      name: "item",
      component: Item
    }
  ],
});

router.beforeEach(async (to, from, next) => {

  const hasToken = getToken();

  if (!to.meta.needAuth) {
    next();
  } else {
    if (!hasToken) {
      next({path: '/login'});
    } else {
      next();
    }
  }

})


export default router;
