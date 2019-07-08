import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      name: 'home', // echarts组件引用参考
      meta: { title: '首页', icon: 'table', noCache: true }
    }]
  },
  // ====================================================================================================================================
  // 新建页面路由-只用-勿动
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Demo', // api请求路由示例--publicTable组件引用--参考
        component: () => import('@/views/demo/index'),
        meta: { title: '示例', icon: 'tree' }
      }
    ]
  },
  {
    path: '/demoPage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'DemoPage', // 模板页面搭建--第二种表格组件封装引用---参考
        component: () => import('@/views/demoPage/index'),
        meta: { title: '模板页面', icon: 'form' }
      }
    ]
  }
  // ====================================================================================================================================

  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap = [
  {
    path: '/permisson',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin', 'super_edior'] }, //页面需要的权限
    children: [
      {
        path: 'index',
        component: Permisson,
        name: '权限测试页',
        meta: { role: ['admin', 'super_edior'] }
      }
    ]
  },
  { path: '*', redirct: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
