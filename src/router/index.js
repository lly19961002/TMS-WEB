import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login/login'
import  headtop from '@/components/HeadTop/headtop'
import  employeeManage from '@/components/SystemManage/employeeManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/headtop',
      name: 'headtop',
      component: headtop
    },
    {
      path: '/employeeManage',
      name: 'employeeManage',
      component: employeeManage
    }
  ]
})
