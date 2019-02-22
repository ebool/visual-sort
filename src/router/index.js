import Vue from 'vue'
import Router from 'vue-router'
import BubbleSort from '@/components/sort/BubbleSort'
import SelectionSort from '@/components/sort/SelectionSort'
import InsertionSort from '@/components/sort/InsertionSort'
import MergeSort from '@/components/sort/MergeSort'
import index from '@/components/index'

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
