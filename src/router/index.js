import Vue from 'vue'
import VueRouter from 'vue-router'
import LoanList from '@/views/Loan';
import LoanDetail from '@/views/LoanDetail';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoanList',
    component: LoanList
  },
  {
    path: '/loan/:id',
    name: 'LoanDetail',
    component: LoanDetail
    // component: () => import('@/views/LoanDetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
