import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import { getToken } from '../util/auth';

const Login = () => import('../views/auth/Login.vue');
const Register = () => import('../views/auth/Register.vue');
const Profile = () => import('../views/Profile.vue');
const Create = () => import('../views/Create.vue');
const Search = () => import('../views/Search.vue');
const Item = () => import('../views/Item.vue');
const NotFound = () => import('../views/404.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { needAuth: true },
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: { needAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/item/:id',
      name: 'item',
      component: Item,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();

  if (to.meta.needAuth) {
    if (hasToken) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    if (hasToken && (to.name === 'register' || to.name === 'login')) {
      next({ path: '/' });
    } else {
      next();
    }
  }
});

export default router;
