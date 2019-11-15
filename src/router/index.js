import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login/login'
import  headtop from '@/components/HeadTop/headtop'
import  notice from '@/components/Notice/notice'
import  byClass from '@/components/ShipperManage/byclass'
import  TransitPosition from '@/components/TransitManage/TransitPosition'
import orderStatus from '@/components/ShipperManage/orderStatus'
import orderRate from '@/components/ShipperManage/orderRate'

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
      component: headtop,
      children:[
        {
          path:'/notice',
          name:'notice',
          component:notice
        },
        {
          path: '/orderStatus',
          name: 'orderStatus',
          component:orderStatus,
        },
        {
          path: '/orderRate',
          name: 'orderRate',
          component:orderRate,
        },
        {
          path: '/byClass',
          name: 'byClass',
          component:byClass,
        },{
          path: '/TransitPosition',
          name: 'TransitPosition',
          component:TransitPosition,
        },
      ]

    },

  ]
})
