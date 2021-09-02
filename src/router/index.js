import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ '../views/About.vue')
},
{
  path: '/login',
  name: 'Login',
  component: () =>
    import('../views/Login.vue')
},
{
  path: '/register',
  name: 'Register',
  component: () =>
    import('../views/Register.vue')
},
{
  path: '/media',
  name: 'MediaSearch',
  component: () =>
    import('../views/MediaSearch.vue')
},
{
  path: '/media/:id',
  name: 'MediaDetails',
  component: () =>
    import('../views/MediaDetails.vue'),
  props: route => { id: parseInt(route.params.id) }
},
  {
      path: '/authors',
      name: 'AuthorSearch',
      component: () =>
          import ('../views/AuthorSearch.vue')
  },
  /*
  {
      path: '/user/:id',
      name: 'AuthorList',
      component: () =>
          import ('../views/AuthorList.vue')
  },
  */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router