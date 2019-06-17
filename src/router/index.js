import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // hash地址 去除#
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      meta: {title: '', keepAlive: false},
      component: (resolve) => require(['../pages/home.vue'], resolve)
    },
    {
      name: 'php',
      path: '/php',
      meta: {title: '', keepAlive: false},
      component: (resolve) => require(['../pages/php.vue'], resolve)
    }
  ]
})
