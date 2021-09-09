import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes : RouteRecordRaw[] = [{
  path: '/',
  redirect: '/media'
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
},
{
  path: '/authors',
  name: 'AuthorSearch',
  component: () =>
    import('../views/AuthorSearch.vue'),
  redirect: "/"
},
{
  path: '/user/:id',
  name: 'User',
  component: () =>
    import('../views/User.vue')
},
{
  path: '/profile',
  name: 'Profile',
  component: () => 
    import('../views/Profile.vue')
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router