import Vue from 'vue'
import Router from 'vue-router'
import BubbleSort from '@/components/BubbleSort'
import SelectionSort from '@/components/SelectionSort'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/bubble',
      name: 'bubbleSort',
      component: BubbleSort
    },
    {
      path: '/selection',
      name: 'selectionSort',
      component: SelectionSort
    },
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
