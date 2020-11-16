import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

  const routes = [

    // {
    //   path: '*',
    //   name: 'Infor',
    //   component: Infor,
    // },
    {
      path: '/kpiGrade',
      component: () => import('../views/info/infoa')
    },
    {
      path: '/kpiDimen',
      component: () => import('../views/info/infoc')
    },
    {
      path: '/kpiTime',
      component: () => import('../views/info/infoe')
    },
    {
      path: '/kpiMech',
      component: () => import('../views/basics/basicsa')
    },
    {
      path: '/kpiImport',
      component: () => import('../views/basics/basicsc')
    },

    {
      path: '/kpiRela',
      component: () => import('../views/basics/basicse')
    },

    //未配置
    {
      path: '/kpiRelaNo',
      component: () => import('../views/basics/basicsno')
    },
    
    {
      path: '/kpiForm',
      component: () => import('../views/basics/basicsg')
    },
    {
      path: '/kpiFormAdd',
      component: () => import('../views/basics/formhead')
    },

    //维度查看
    {
      path: '/kpiFormList',
      component: () => import('../views/basics/basicsk')
    },
//满意度
    {
      path: '/kpisatiform',
      component: () => import('../views/basics/satiform')
    },
    {
      path: '/kpipreview',
      component: () => import('../views/basics/preview')
    },
    
    {
      path: '/kpispeed',
      component: () => import('../views/admin/admina')
    },

    {
      path: '/kpiuser',
      component: () => import('../views/admin/adminc')
    },
    {
      path: '/kpicoef',
      component: () => import('../views/admin/admine')
    },

    {
      path: '/kpiorgan',
      component: () => import('../views/admin/adminp')
    },

    {
      path: '/kpiPend',
      component: () => import('../views/mine/minee')
    },

    {
      path: '/kpime',
      component: () => import('../views/mine/minea')
    },
    {
      path: '/kpiTask',
      component: () => import('../views/mine/minec')
    },
    {
      path: '/kpimineform',
      component: () => import('../views/mine/mineform')
    },

    {
      path: '/kpiTaskT',
      component: () => import('../views/mine/minetest')
    },
    

    // {
    //   path: '/kpimineform',
    //   component: () => import('../views/mine/mineform')
    // },

    {
      path: '/test',
      component: () => import('../views/test')
    },
  {
    path: '/',
    component: Index,
    children: [
    {
      path: '/infoa',
      component: () => import('../views/info/infoa')
    },
    {
      path: '/infoc',
      component: () => import('../views/info/infoc')
    },
    {
      path: '/infoe',
      component: () => import('../views/info/infoe')
    },
    {
      path: '/basicsa',
      component: () => import('../views/basics/basicsa')
    },
    {
      path: '/basicsc',
      component: () => import('../views/basics/basicsc')
    },
    {
      path: '/basicse',
      component: () => import('../views/basics/basicse')
    },
    {
      path: '/basicsg',
      component: () => import('../views/basics/basicsg')
    },
     {
      path: '/basicsk',
      component: () => import('../views/basics/basicsk')
    },
    {
      path: '/basicsno',
      component: () => import('../views/basics/basicsno')
    },

    {
      path: '/formhead',
      component: () => import('../views/basics/formhead')
    }, 
     {
      path: '/preview',
      component: () => import('../views/basics/preview')
    },
    {
      path: '/satiform',
      component: () => import('../views/basics/satiform')
    },

    {
      path: '/admina',
      component: () => import('../views/admin/admina')
    },
    {
      path: '/adminc',
      component: () => import('../views/admin/adminc')
    },
    {
      path: '/admine',
      component: () => import('../views/admin/admine')
    },
    {
      path: '/adming',
      component: () => import('../views/admin/adming')
    },
    {
      path: '/adminp',
      component: () => import('../views/admin/adminp')
    },
    {
      path: '/minea',
      component: () => import('../views/mine/minea')
    },
    {
      path: '/minec',
      component: () => import('../views/mine/minec')
    },
    {
      path: '/minee',
      component: () => import('../views/mine/minee')
    },
    {
      path: '/mineform',
      component: () => import('../views/mine/mineform')
    },
  ]
  },
]

const router = new VueRouter({
  routes
})

export default router
