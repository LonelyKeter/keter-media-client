import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes : RouteRecordRaw[] = [{
  path: '/',
  redirect: '/media'
},
{
  path: '/login',
  name: 'Login',
  component: () =>
    import('../views/users/Login.vue')
},
{
  path: '/register',
  name: 'Register',
  component: () =>
    import('../views/users/Register.vue')
},
{
  path: '/media', 
  name: 'MediaSearch',
  component: () =>
    import('../views/media/MediaSearch.vue')
},
{
  path: '/media/:id',
  name: 'MediaDetails',
  component: () =>
    import('../views/media/MediaDetails.vue'),
},
{
  path: '/authors',
  name: 'AuthorSearch',
  component: () =>
    import('../views/users/AuthorSearch.vue'),
},
{
  path: '/user/:id',
  name: 'User',
  component: () =>
    import('../views/users/User.vue')
},
{
  path: '/licenses',
  name: 'LicenseList',
  component: () => 
    import('../views/licenses/LicenseList.vue')
},
{
  path: '/licenses/:key',
  name: 'LicenseDetails',
  component: () => 
    import('../views/licenses/LicenseDetails.vue')
},
{
  path: '/media/materials/:id',
  name: 'MaterialDetails',
  component: () => 
    import('../views/media/MaterialDetails.vue')
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router