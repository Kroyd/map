import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/RouteMap.vue'
import loginMap from "@/auth/loginMap.vue"
import { isLoggedIn } from './auth';


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'auth-login',
            component: loginMap,
        },
        {
            path: '/',
            name: 'map',
            component: Map,
            meta: {requiresAuth: true}
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !isLoggedIn()) {
        if(to.path !== '/login') {
            next({path: '/login'})
        }
    }else {
        next()
    }
})
export default router