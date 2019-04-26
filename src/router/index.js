import Vue from 'vue'
import Router from 'vue-router'
import BubbleSort from 'src/pages/bubble'
import SelectionSort from 'src/pages/selection'
import InsertionSort from 'src/pages/insertion'
import MergeSort from 'src/pages/merge'
import index from 'src/pages/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '',
          component: BubbleSort
        },
        {
          path: 'bubble',
          component: BubbleSort
        },
        {
          path: 'selection',
          component: SelectionSort
        },
        {
          path: 'insertion',
          component: InsertionSort
        },
        {
          path: 'merge',
          component: MergeSort
        }
      ]
    }
  ]
})
