import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/map'),
        name: 'map',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
    },
]

export default new Router({
    // mode: 'hash',
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
