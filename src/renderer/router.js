import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/releases',
      name: 'releases',
      component: require('@/components/Releases')
    },
    {
      path: '/history',
      name: 'history',
      component: require('@/components/History')
    },
    {
      path: '/console',
      name: 'console',
      component: require('@/components/Console')
    },
    {
      path: '*',
      redirect: '/releases'
    }
  ]
})
