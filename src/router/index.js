import Vue from 'vue'
import Router from 'vue-router'
import bubble from 'src/pages/bubble'
import selection from 'src/pages/selection'
import insertion from 'src/pages/insertion'
import merge from 'src/pages/merge'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: bubble,
    },
    {
      path: '/bubble',
      component: bubble
    },
    {
      path: '/selection',
      component: selection
    },
    {
      path: '/insertion',
      component: insertion
    },
    {
      path: '/merge',
      component: merge
    }
  ]
})
